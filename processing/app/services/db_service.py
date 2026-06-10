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
    Implements a thread-safe singleton pattern with lazy pool initialization.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseService, cls).__new__(cls)
                cls._instance._pool = None
                cls._instance._pool_lock = threading.Lock()
        return cls._instance

    @property
    def connection_pool(self):
        if self._pool is None:
            with self._pool_lock:
                if self._pool is None:
                    try:
                        logger.info("Initializing Database Connection Pool...")
                        self._pool = pool.ThreadedConnectionPool(
                            minconn=1,
                            maxconn=20,
                            dsn=settings.DATABASE_URL
                        )
                        logger.info("Database Connection Pool initialized successfully.")
                    except Exception as e:
                        logger.error(f"Failed to initialize database connection pool: {e}")
                        raise
        return self._pool

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

    @staticmethod
    def _fmt_vector(embedding: list[float]) -> str:
        """
        Formats a list of floats into a pgvector-compatible string: '[0.1,0.2,...]'.
        """
        return f"[{','.join(map(str, embedding))}]"

    def register_guest_embedding(self, profile_id: str, embedding: list[float]) -> None:
        """
        Updates the public.profiles table with the guest's face embedding.
        """
        vector_str = self._fmt_vector(embedding)
        query = "UPDATE public.profiles SET face_embedding = %s WHERE id = %s"

        with self.get_cursor() as cursor:
            cursor.execute(query, (vector_str, profile_id))
            logger.info(f"Registered embedding for profile {profile_id}")

    def create_registration(self, profile_id: str, event_id: str, selfie_path: str) -> None:
        """
        Creates a new registration record in public.guest_registrations.
        Idempotent using ON CONFLICT.
        """
        query = """
            INSERT INTO public.guest_registrations (guest_id, event_id, selfie_path)
            VALUES (%s, %s, %s)
            ON CONFLICT (guest_id, event_id) DO UPDATE
            SET selfie_path = EXCLUDED.selfie_path
        """
        with self.get_cursor() as cursor:
            cursor.execute(query, (profile_id, event_id, selfie_path))
            logger.info(f"Created/updated registration for guest {profile_id} at event {event_id}")

    def update_photo_status(self, photo_id: str, status: str) -> None:
        """
        Updates the processing status of a photo in public.photos.
        """
        query = "UPDATE public.photos SET processing_status = %s WHERE id = %s"
        with self.get_cursor() as cursor:
            cursor.execute(query, (status, photo_id))
            logger.info(f"Updated photo {photo_id} status to {status}")

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
                self._fmt_vector(face['embedding']),
                json.dumps(face['bbox']),
                face['det_score']
            ))

        with self.get_cursor() as cursor:
            extras.execute_values(cursor, query, values)
            results = cursor.fetchall()
            face_ids = [str(row['id']) for row in results]
            logger.info(f"Saved {len(face_ids)} detected faces for photo {photo_id}")
            return face_ids

    def match_unresolved_faces(self, event_id: str) -> list[dict]:
        """
        Matches unresolved faces in an event to guest profiles using pgvector cosine distance.
        Uses a single batch UPDATE for performance.
        """
        threshold = settings.FACE_SIMILARITY_THRESHOLD

        # 1. Find all matches for the event below threshold
        match_query = """
            SELECT
                df.id AS face_id,
                match_subquery.guest_id AS profile_id
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

        with self.get_cursor() as cursor:
            cursor.execute(match_query, (event_id, threshold))
            matches = cursor.fetchall()

            if not matches:
                logger.info(f"No unresolved faces matched for event {event_id}")
                return []

            # 2. Batch UPDATE using a single query
            update_query = """
                UPDATE public.detected_faces
                SET matched_profile_id = data.profile_id::uuid
                FROM (VALUES %s) AS data(face_id, profile_id)
                WHERE public.detected_faces.id = data.face_id::uuid
            """

            update_values = [(m['face_id'], m['profile_id']) for m in matches]
            extras.execute_values(cursor, update_query, update_values)

            logger.info(f"Batch resolved {len(matches)} faces for event {event_id}")
            return [dict(m) for m in matches]

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
            cursor.execute(query, (str(days),))
            deleted_count = cursor.rowcount
            logger.info(f"Cleaned up {deleted_count} old unresolved faces.")
            return deleted_count

    def close_pool(self):
        """
        Closes all connections in the pool.
        """
        if self._pool:
            logger.info("Closing Database Connection Pool...")
            self._pool.closeall()
            self._pool = None
            logger.info("Database Connection Pool closed.")

# Thread-safe singleton instance
db_service = DatabaseService()
