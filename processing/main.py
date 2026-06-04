import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("glimpse-processing")

app = FastAPI(
    title="Glimpse Processing Service",
    description="ML Inference service for face detection and embedding extraction.",
    version="1.0.0"
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
