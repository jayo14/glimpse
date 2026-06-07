import logging
import urllib.parse
from contextlib import asynccontextmanager
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from arq import create_pool
from arq.connections import RedisSettings

from app.core.config import settings
from app.services.face_engine import face_engine
from app.services.db_service import db_service
from app.services.storage_service import storage_service

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("glimpse-api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    logger.info("Application starting up...")

    # 1. Warm up FaceEngine
    try:
        face_engine.prepare_engine()
    except Exception as e:
        logger.error(f"Failed to warm up FaceEngine: {e}")

    # 2. Touch DB pool
    try:
        _ = db_service.connection_pool
        logger.info("Database connection pool initialized.")
    except Exception as e:
        logger.error(f"Failed to initialize database pool: {e}")

    # 3. Create ARQ Redis pool
    try:
        url = urllib.parse.urlparse(settings.REDIS_URL)
        app.state.redis = await create_pool(RedisSettings(
            host=url.hostname or 'localhost',
            port=url.port or 6379,
            password=url.password,
            database=int(url.path.lstrip('/')) if url.path else 0
        ))
        logger.info("ARQ Redis pool initialized.")
    except Exception as e:
        logger.error(f"Failed to initialize ARQ Redis pool: {e}")
        app.state.redis = None

    yield

    # Shutdown
    logger.info("Application shutting down...")
    if app.state.redis:
        await app.state.redis.close()
    db_service.close_pool()

app = FastAPI(
    title="Glimpse Processing Service",
    version="1.0.0",
    lifespan=lifespan
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WebhookPayload(BaseModel):
    photo_id: str
    event_id: str
    storage_path: str

@app.get("/health")
def health_check():
    """
    Health endpoint to verify system status.
    """
    checks = {
        "database": False,
        "redis": False,
        "face_engine_loaded": face_engine._app is not None
    }

    try:
        with db_service.get_cursor() as cursor:
            cursor.execute("SELECT 1")
            checks["database"] = True
    except Exception:
        pass

    if app.state.redis:
        checks["redis"] = True

    status = "healthy" if all(checks.values()) else "degraded"

    return {
        "status": status,
        "checks": checks
    }

@app.post("/api/v1/process/selfie")
async def process_selfie(
    profile_id: str = Form(...),
    event_id: str = Form(...),
    file: UploadFile = File(...)
):
    """
    Synchronous guest selfie onboarding.
    """
    logger.info(f"Processing selfie for profile_id: {profile_id}")

    try:
        # Read bytes
        file_bytes = await file.read()

        # Detect face
        detected_faces = face_engine.process_image(file_bytes)

        if len(detected_faces) == 0:
            raise HTTPException(status_code=400, detail="No face detected in selfie.")
        if len(detected_faces) > 1:
            raise HTTPException(status_code=400, detail="Multiple faces detected in selfie.")

        face_data = detected_faces[0]
        embedding = face_data['embedding']

        # Upload to S3
        storage_path = None
        try:
            filename = f"{profile_id}.jpg"
            storage_path = storage_service.upload_selfie(file_bytes, filename)

            # DB writes
            db_service.register_guest_embedding(profile_id, embedding)
            db_service.create_registration(profile_id, event_id, storage_path)

            return {"status": "success"}

        except Exception as e:
            logger.error(f"Error during selfie processing: {e}")
            if storage_path:
                storage_service.delete_selfie(storage_path)
            raise HTTPException(status_code=500, detail="Internal server error during registration.")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/v1/process/webhook")
async def process_webhook(payload: WebhookPayload):
    """
    Webhook to enqueue photo processing job.
    """
    if not app.state.redis:
        raise HTTPException(status_code=503, detail="Redis service unavailable.")

    try:
        await app.state.redis.enqueue_job(
            'process_photo_job',
            payload.photo_id,
            payload.event_id,
            payload.storage_path
        )
        return {"status": "enqueued", "photo_id": payload.photo_id}
    except Exception as e:
        logger.error(f"Failed to enqueue job: {e}")
        raise HTTPException(status_code=500, detail="Failed to enqueue background job.")
