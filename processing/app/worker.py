import logging
import urllib.parse
from arq import cron
from arq.connections import RedisSettings
from app.core.config import settings
from app.services.face_engine import face_engine
from app.services.db_service import db_service
from app.services.storage_service import storage_service

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("glimpse-worker")

def _parse_redis_settings():
    """
    Safely parses the REDIS_URL from settings.
    """
    try:
        url = urllib.parse.urlparse(settings.REDIS_URL)
        return RedisSettings(
            host=url.hostname or 'localhost',
            port=url.port or 6379,
            password=url.password,
            database=int(url.path.lstrip('/')) if url.path else 0
        )
    except Exception as e:
        logger.error(f"Failed to parse REDIS_URL: {e}")
        # Return default settings if parsing fails to avoid module-level crash
        return RedisSettings()

async def startup(ctx):
    """
    Worker startup hook.
    Prepares FaceEngine and ensures DB connection.
    """
    logger.info("Worker starting up...")
    face_engine.prepare_engine()
    # Trigger lazy pool initialization
    _ = db_service.connection_pool
    logger.info("Worker startup complete.")

async def shutdown(ctx):
    """
    Worker shutdown hook.
    Closes DB connections.
    """
    logger.info("Worker shutting down...")
    db_service.close_pool()
    logger.info("Worker shutdown complete.")

async def process_photo_job(ctx, photo_id: str, event_id: str, storage_path: str):
    """
    Asynchronous job to process an uploaded photo.
    Detects faces, saves them, and matches them to guest profiles.
    """
    logger.info(f"Starting process_photo_job for photo {photo_id} in event {event_id}")

    try:
        # 1. Update status to PROCESSING
        db_service.update_photo_status(photo_id, 'PROCESSING')

        # 2. Download image from S3
        img_bytes = storage_service.download_image(storage_path)

        # 3. Detect faces
        detected_faces = face_engine.process_image(img_bytes)

        if not detected_faces:
            logger.info(f"No faces detected in photo {photo_id}. Marking COMPLETED.")
            db_service.update_photo_status(photo_id, 'COMPLETED')
            return

        # 4. Save detected faces
        db_service.save_detected_faces(photo_id, event_id, detected_faces)

        # 5. Match unresolved faces for this event
        db_service.match_unresolved_faces(event_id)

        # 6. Update status to COMPLETED
        db_service.update_photo_status(photo_id, 'COMPLETED')
        logger.info(f"Successfully processed photo {photo_id}")

    except Exception as e:
        logger.error(f"Failed to process photo {photo_id}: {e}", exc_info=True)
        # Update status to FAILED
        try:
            db_service.update_photo_status(photo_id, 'FAILED')
        except Exception as db_err:
            logger.error(f"Could not update status to FAILED for photo {photo_id}: {db_err}")

        # Re-raise so ARQ can handle retries
        raise

async def run_cleanup_job(ctx):
    """
    Nightly cleanup job to remove old unresolved faces.
    """
    logger.info("Starting nightly cleanup job...")
    try:
        count = db_service.cleanup_old_faces(30)
        logger.info(f"Cleanup job finished. Deleted {count} rows.")
    except Exception as e:
        logger.error(f"Cleanup job failed: {e}", exc_info=True)

class WorkerSettings:
    """
    ARQ Worker configuration.
    """
    functions = [process_photo_job]
    cron_jobs = [
        cron(run_cleanup_job, hour=3, minute=0)
    ]
    on_startup = startup
    on_shutdown = shutdown
    redis_settings = _parse_redis_settings()
    max_jobs = 10
    job_timeout = 120
    max_tries = 3
    keep_result = 3600
