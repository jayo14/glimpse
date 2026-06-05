import logging
import asyncio
from arq import cron
from arq.connections import RedisSettings
from app.core.config import settings
from app.services.face_engine import face_engine
from app.services.db_service import db_service
from app.services.storage_service import storage_service

logger = logging.getLogger("arq.worker")

async def startup(ctx):
    """Run on worker start."""
    logger.info("Starting up ML Worker...")
    try:
        face_engine.prepare_engine()
        _ = db_service.connection_pool
        logger.info("Worker initialization complete.")
    except Exception as e:
        logger.error(f"Worker failed to initialize: {e}")
        raise

async def shutdown(ctx):
    """Run on worker shutdown."""
    logger.info("Shutting down ML Worker...")
    db_service.close_pool()

async def process_photo_job(ctx, photo_id: str, event_id: str, storage_path: str):
    """
    Main background job to process an uploaded photo.
    Downloads the image, extracts faces, saves them, and attempts to match.
    """
    logger.info(f"Processing photo {photo_id} for event {event_id} at {storage_path}")

    try:
        # 1. Download image bytes statelessly
        image_bytes = storage_service.download_image(storage_path)

        # 2. Extract faces
        detected_faces = face_engine.process_image(image_bytes)
        if not detected_faces:
            logger.info(f"No faces detected in photo {photo_id}.")
            return {"status": "no_faces"}

        # 3. Save faces to database
        db_service.save_detected_faces(photo_id, event_id, detected_faces)

        # 4. Attempt to match unresolved faces
        matches = db_service.match_unresolved_faces(event_id)
        
        logger.info(f"Photo {photo_id} processed. Found {len(detected_faces)} faces, {len(matches)} matches.")
        return {"status": "success", "faces": len(detected_faces), "matches": len(matches)}

    except Exception as e:
        logger.error(f"Error processing photo {photo_id}: {e}", exc_info=True)
        # ARQ will retry if the exception is unhandled, but you may want custom logic
        raise

async def run_cleanup_job(ctx):
    """
    Nightly cron job to clean up old unresolved faces.
    """
    logger.info("Running nightly cleanup of unresolved faces...")
    try:
        deleted = db_service.cleanup_old_faces(days=30)
        logger.info(f"Cleanup finished. {deleted} records removed.")
    except Exception as e:
        logger.error(f"Error during nightly cleanup: {e}", exc_info=True)

# Parse Redis URL for ARQ settings
import urllib.parse
redis_url = urllib.parse.urlparse(settings.REDIS_URL)

class WorkerSettings:
    """Settings for the ARQ worker."""
    redis_settings = RedisSettings(
        host=redis_url.hostname or 'localhost',
        port=redis_url.port or 6379,
        password=redis_url.password,
    )
    functions = [process_photo_job]
    cron_jobs = [
        cron(run_cleanup_job, hour=3, minute=0) # Run at 3 AM every day
    ]
    on_startup = startup
    on_shutdown = shutdown
    max_jobs = 10
    job_timeout = 60 # 60 seconds max per job
