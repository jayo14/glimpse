import os
import sys
import logging
import psycopg2
from redis import Redis
from dotenv import load_dotenv

# Load .env at the very top
load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("pre-flight")

def check_env():
    logger.info("Running pre-flight environment checks...")

    database_url = os.getenv("DATABASE_URL")
    redis_url = os.getenv("REDIS_URL")
    s3_endpoint = os.getenv("SUPABASE_S3_ENDPOINT_URL")
    s3_key_id = os.getenv("SUPABASE_S3_ACCESS_KEY_ID")
    s3_secret = os.getenv("SUPABASE_S3_SECRET_ACCESS_KEY")

    missing = []
    if not database_url: missing.append("DATABASE_URL")
    if not redis_url: missing.append("REDIS_URL")
    if not s3_endpoint: missing.append("SUPABASE_S3_ENDPOINT_URL")
    if not s3_key_id: missing.append("SUPABASE_S3_ACCESS_KEY_ID")
    if not s3_secret: missing.append("SUPABASE_S3_SECRET_ACCESS_KEY")

    if missing:
        logger.error(f"Missing required environment variables: {', '.join(missing)}")
        sys.exit(1)

    # Check Database Connection and pgvector
    try:
        logger.info("Validating database connection and pgvector...")
        conn = psycopg2.connect(database_url)
        with conn.cursor() as cur:
            cur.execute("SELECT extname FROM pg_extension WHERE extname = 'vector';")
            if not cur.fetchone():
                logger.error("pgvector extension not found. Run: CREATE EXTENSION IF NOT EXISTS vector;")
                sys.exit(1)
        conn.close()
        logger.info("Database and pgvector OK.")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        sys.exit(1)

    # Check Redis Connection
    try:
        logger.info("Validating Redis connection...")
        r = Redis.from_url(redis_url)
        r.ping()
        r.close()
        logger.info("Redis connection OK.")
    except Exception as e:
        logger.error(f"Redis connection failed: {e}")
        sys.exit(1)

    logger.info("=== All checks passed ===")

if __name__ == "__main__":
    check_env()
