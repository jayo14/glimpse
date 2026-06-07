import logging
import threading
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

logger = logging.getLogger(__name__)

class StorageService:
    """
    Service for interacting with Supabase Storage (S3 compatible).
    Implements a thread-safe singleton with lazy S3 client initialization.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(StorageService, cls).__new__(cls)
                cls._instance._s3 = None
                cls._instance._s3_lock = threading.Lock()
        return cls._instance

    @property
    def s3_client(self):
        if self._s3 is None:
            with self._s3_lock:
                if self._s3 is None:
                    try:
                        logger.info("Initializing S3 Client...")
                        self._s3 = boto3.client(
                            's3',
                            endpoint_url=settings.SUPABASE_S3_ENDPOINT_URL,
                            aws_access_key_id=settings.SUPABASE_S3_ACCESS_KEY_ID,
                            aws_secret_access_key=settings.SUPABASE_S3_SECRET_ACCESS_KEY,
                            region_name='us-east-1' # Default for many S3-compat layers
                        )
                        logger.info("S3 Client initialized successfully.")
                    except Exception as e:
                        logger.error(f"Failed to initialize S3 client: {e}")
                        raise
        return self._s3

    def download_image(self, storage_path: str) -> bytes:
        """
        Downloads image bytes from the bucket into memory.
        """
        try:
            logger.info(f"Downloading image: {storage_path}")
            response = self.s3_client.get_object(
                Bucket=settings.STORAGE_BUCKET_NAME,
                Key=storage_path
            )
            return response['Body'].read()
        except ClientError as e:
            logger.error(f"Failed to download {storage_path}: {e}")
            raise RuntimeError(f"Could not download image from storage: {e}")

    def upload_selfie(self, file_bytes: bytes, filename: str) -> str:
        """
        Uploads a guest selfie to the bucket under the 'selfies/' prefix.
        Returns the storage path (key) on success.
        """
        storage_path = f"selfies/{filename}"
        try:
            logger.info(f"Uploading selfie to path: {storage_path}")
            self.s3_client.put_object(
                Bucket=settings.STORAGE_BUCKET_NAME,
                Key=storage_path,
                Body=file_bytes,
                ContentType="image/jpeg"
            )
            return storage_path
        except ClientError as e:
            logger.error(f"S3 upload failed for {storage_path}: {e}")
            raise RuntimeError(f"Could not upload selfie to storage: {e}")

    def delete_selfie(self, storage_path: str) -> None:
        """
        Deletes an object from S3. Used for cleanup if registration fails.
        Log warning on failure, but never raise.
        """
        try:
            logger.info(f"Deleting object from path: {storage_path}")
            self.s3_client.delete_object(
                Bucket=settings.STORAGE_BUCKET_NAME,
                Key=storage_path
            )
        except Exception as e:
            logger.warning(f"Failed to delete orphaned object {storage_path}: {e}")

# Thread-safe singleton instance
storage_service = StorageService()
