import os
import sys
import logging
import psycopg2
from redis import Redis

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("pre-flight")

def check_env():
    logger.info("Running pre-flight environment checks...")

    database_url = os.getenv("DATABASE_URL")
    redis_url = os.getenv("REDIS_URL")
    supabase_s3_endpoint = os.getenv("SUPABASE_S3_ENDPOINT_URL")

    missing = []
    if not database_url: missing.append("DATABASE_URL")
    if not redis_url: missing.append("REDIS_URL")
    if not supabase_s3_endpoint: missing.append("SUPABASE_S3_ENDPOINT_URL")

    if missing:
        logger.error(f"Missing required environment variables: {', '.join(missing)}")
        sys.exit(1)

    # Check Database Connection
    try:
        logger.info("Validating database connection...")
        conn = psycopg2.connect(database_url)
        conn.close()
        logger.info("Database connection OK.")
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

    logger.info("All pre-flight checks passed successfully.")

if __name__ == "__main__":
    check_env()
