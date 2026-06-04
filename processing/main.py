import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.services.face_engine import face_engine
from app.services.db_service import db_service
from app.services.storage_service import storage_service

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("glimpse-processing")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup tasks
    logger.info("Application starting up...")

    # Initialize and warm up FaceEngine
    try:
        face_engine.prepare_engine()
    except Exception as e:
        logger.error(f"Critical error during FaceEngine warmup: {e}")
        # In a real production environment, you might want to exit if ML is critical

    # Database Pool is initialized on first access via singleton,
    # but we can trigger it here to ensure connectivity on startup.
    try:
        _ = db_service.connection_pool
        logger.info("Database connection pool verified.")
    except Exception as e:
        logger.error(f"Critical error during Database initialization: {e}")

    yield

    # Shutdown tasks
    logger.info("Application shutting down...")
    db_service.close_pool()

app = FastAPI(
    title="Glimpse Processing Service",
    description="ML Inference service for face detection and embedding extraction.",
    version="1.0.0",
    lifespan=lifespan
)

# Setup CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    """
    Lightweight health endpoint to verify core configurations.
    """
    health_status = {
        "status": "healthy",
        "config_checks": {
            "DATABASE_URL": bool(settings.DATABASE_URL),
            "REDIS_URL": bool(settings.REDIS_URL),
            "SUPABASE_S3_ENDPOINT_URL": bool(settings.SUPABASE_S3_ENDPOINT_URL),
        }
    }

    # If any critical config is missing, return degraded status
    if not all(health_status["config_checks"].values()):
        health_status["status"] = "degraded"

    return health_status

@app.get("/")
def read_root():
    return {"message": "Glimpse Processing Service is running"}

@app.post("/api/v1/process/selfie")
async def process_selfie(
    profile_id: str = Form(...),
    event_id: str = Form(...),
    file: UploadFile = File(...)
) -> dict:
    """
    Synchronous onboarding endpoint for guest selfie registration.
    Validates face quality, uploads to S3, and updates database records.
    """
    logger.info(f"Processing selfie for profile_id: {profile_id}, event_id: {event_id}")

    try:
        # 1. Read file into memory (stateless)
        file_bytes = await file.read()

        # 2. Process image with FaceEngine
        detected_faces = face_engine.process_image(file_bytes)

        # 3. Quality Control Checks
        if not detected_faces:
            raise HTTPException(
                status_code=400,
                detail={"code": "NO_FACE_DETECTED", "message": "No face found in the submitted selfie."}
            )

        if len(detected_faces) > 1:
            raise HTTPException(
                status_code=400,
                detail={"code": "MULTIPLE_FACES_DETECTED", "message": "Multiple faces detected. Please upload a clear photo of only yourself."}
            )

        face_data = detected_faces[0]
        embedding = face_data['embedding']

        # 4. Storage & Database Sequence
        storage_path = None
        try:
            # Upload Selfie to S3
            filename = f"{profile_id}.jpg"
            storage_path = storage_service.upload_selfie(file_bytes, filename)

            # Register Embedding in Profile
            db_service.register_guest_embedding(profile_id, embedding)

            # Create Registration Record
            db_service.create_registration(profile_id, event_id, storage_path)

            logger.info(f"Successfully onboarded guest {profile_id} for event {event_id}")

            return {
                "status": "success",
                "profile_id": profile_id,
                "event_id": event_id,
                "message": "Onboarding face profile registered successfully."
            }

        except Exception as e:
            logger.error(f"Transaction failed for {profile_id}: {e}", exc_info=True)

            # Cleanup: If S3 upload succeeded but DB failed, remove orphaned file
            if storage_path:
                logger.info(f"Cleaning up orphaned S3 object: {storage_path}")
                storage_service.delete_selfie(storage_path)

            raise HTTPException(
                status_code=500,
                detail="An internal error occurred during profile registration."
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in process_selfie: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
