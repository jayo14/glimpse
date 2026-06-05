import logging
import json
import threading
from contextlib import contextmanager
import psycopg2
from psycopg2 import pool, extras
from app.core.config import settings

logger = logging.getLogger(__name__)

class DatabaseService:
    """
    Database service handling connection pooling and pgvector operations.
    Implements a thread-safe singleton pattern.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseService, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self.connection_pool = None
        try:
            logger.info("Initializing Database Connection Pool...")
            self.connection_pool = pool.ThreadedConnectionPool(
                minconn=1,
                maxconn=10,
                dsn=settings.DATABASE_URL
            )
            logger.info("Database Connection Pool initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize database connection pool: {e}")
            raise

        self._initialized = True

    @contextmanager
    def get_cursor(self, autocommit=False):
        """
        Context manager to borrow a connection from the pool and return it after use.
        """
        conn = None
        try:
            conn = self.connection_pool.getconn()
            conn.autocommit = autocommit
            with conn.cursor(cursor_factory=extras.RealDictCursor) as cursor:
                yield cursor
            if not autocommit:
                conn.commit()
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Database error: {e}")
            raise
        finally:
            if conn:
                self.connection_pool.putconn(conn)

    def format_embedding(self, embedding: list[float]) -> str:
        """
        Formats a list of floats into a pgvector-compatible string: '[0.1,0.2,...]'.
        """
        return f"[{','.join(map(str, embedding))}]"

    def register_guest_embedding(self, profile_id: str, embedding: list[float]) -> None:
        """
        Updates the public.profiles table with the guest's face embedding.
        """
        vector_str = self.format_embedding(embedding)
        query = "UPDATE public.profiles SET face_embedding = %s WHERE id = %s"

        with self.get_cursor() as cursor:
            cursor.execute(query, (vector_str, profile_id))
            logger.info(f"Registered embedding for profile {profile_id}")

    def save_detected_faces(self, photo_id: str, event_id: str, detected_faces: list[dict]) -> list[str]:
        """
        Inserts detected faces into the public.detected_faces table.
        Uses execute_values for efficient multi-row insertion.
        """
        if not detected_faces:
            return []

        query = """
            INSERT INTO public.detected_faces (photo_id, event_id, embedding, bounding_box, confidence)
            VALUES %s
            RETURNING id
        """

        values = []
        for face in detected_faces:
            values.append((
                photo_id,
                event_id,
                self.format_embedding(face['embedding']),
                json.dumps(face['bbox']),
                face['det_score']
            ))

        with self.get_cursor() as cursor:
            extras.execute_values(cursor, query, values)
            results = cursor.fetchall()
            face_ids = [row['id'] for row in results]
            logger.info(f"Saved {len(face_ids)} detected faces for photo {photo_id}")
            return face_ids

    def match_unresolved_faces(self, event_id: str) -> list[dict]:
        """
        Matches unresolved faces in an event to guest profiles using pgvector cosine distance.
        Updates the matched_profile_id column for matches below the similarity threshold.
        """
        threshold = settings.FACE_SIMILARITY_THRESHOLD

        # Query to find matches using the provided CROSS JOIN LATERAL pattern
        match_query = """
            SELECT
                df.id AS face_id,
                match_subquery.guest_id AS matched_profile_id,
                (df.embedding <=> match_subquery.face_embedding) AS distance
            FROM public.detected_faces df
            CROSS JOIN LATERAL (
                SELECT gr.guest_id, p.face_embedding
                FROM public.guest_registrations gr
                JOIN public.profiles p ON p.id = gr.guest_id
                WHERE gr.event_id = df.event_id
                  AND p.face_embedding IS NOT NULL
                ORDER BY df.embedding <=> p.face_embedding ASC
                LIMIT 1
            ) match_subquery
            WHERE df.event_id = %s
              AND df.matched_profile_id IS NULL
              AND (df.embedding <=> match_subquery.face_embedding) < %s
        """

        matches = []
        with self.get_cursor() as cursor:
            cursor.execute(match_query, (event_id, threshold))
            matches = cursor.fetchall()

            if not matches:
                return []

            # Update matched_profile_id for each found match
            update_query = """
                UPDATE public.detected_faces
                SET matched_profile_id = %s
                WHERE id = %s
            """

            update_values = [(m['matched_profile_id'], m['face_id']) for m in matches]
            for val in update_values:
                cursor.execute(update_query, val)

            logger.info(f"Resolved {len(matches)} faces for event {event_id}")
            return [dict(m) for m in matches]

    def create_registration(self, profile_id: str, event_id: str, selfie_path: str) -> None:
        """
        Creates a new registration record in public.guest_registrations.
        """
        query = """
            INSERT INTO public.guest_registrations (guest_id, event_id, selfie_path)
            VALUES (%s, %s, %s)
        """
        with self.get_cursor() as cursor:
            cursor.execute(query, (profile_id, event_id, selfie_path))
            logger.info(f"Created registration for guest {profile_id} at event {event_id}")

    def cleanup_old_faces(self, days: int = 30) -> int:
        """
        Deletes rows from detected_faces where matched_profile_id IS NULL 
        and created_at is older than the specified number of days.
        Returns the number of deleted rows.
        """
        query = """
            DELETE FROM public.detected_faces
            WHERE matched_profile_id IS NULL
              AND created_at < NOW() - INTERVAL '%s days'
        """
        with self.get_cursor() as cursor:
            cursor.execute(query, (days,))
            deleted_count = cursor.rowcount
            logger.info(f"Cleaned up {deleted_count} old unresolved faces (older than {days} days).")
            return deleted_count

    def close_pool(self):
        """
        Closes all connections in the pool.
        """
        if self.connection_pool:
            logger.info("Closing Database Connection Pool...")
            self.connection_pool.closeall()
            logger.info("Database Connection Pool closed.")

# Thread-safe singleton instance
db_service = DatabaseService()
