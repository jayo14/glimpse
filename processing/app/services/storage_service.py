import logging
import threading
import io
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from app.core.config import settings

logger = logging.getLogger(__name__)

class StorageService:
    """
    Storage service for interacting with Supabase S3-compatible buckets.
    Implements a thread-safe singleton pattern.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(StorageService, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        try:
            logger.info("Initializing S3 Client...")
            # Configure retries and timeouts
            s3_config = Config(
                retries={'max_attempts': 3, 'mode': 'standard'},
                connect_timeout=5,
                read_timeout=10
            )

            self.s3_client = boto3.client(
                's3',
                endpoint_url=settings.SUPABASE_S3_ENDPOINT_URL,
                aws_access_key_id=settings.SUPABASE_S3_ACCESS_KEY_ID,
                aws_secret_access_key=settings.SUPABASE_S3_SECRET_ACCESS_KEY,
                region_name="us-east-1",  # Standard region as required by S3 client
                config=s3_config
            )
            self.bucket_name = settings.STORAGE_BUCKET_NAME
            logger.info(f"S3 Client initialized successfully for bucket: {self.bucket_name}")
        except Exception as e:
            logger.error(f"Failed to initialize S3 client: {e}")
            raise

        self._initialized = True

    def download_image(self, storage_path: str) -> bytes:
        """
        Downloads an image from S3 into memory and returns the raw bytes.
        Stateless: Does not write to local disk.
        """
        try:
            logger.info(f"Downloading image from path: {storage_path}")
            response = self.s3_client.get_object(Bucket=self.bucket_name, Key=storage_path)
            # Read the entire streaming body into memory
            image_bytes = response['Body'].read()
            return image_bytes
        except ClientError as e:
            error_code = e.response.get('Error', {}).get('Code', 'Unknown')
            logger.error(f"S3 download failed for {storage_path}: {error_code} - {e}")
            raise RuntimeError(f"Could not retrieve image from storage: {error_code}")
        except Exception as e:
            logger.error(f"Unexpected error during image download: {e}")
            raise

    def upload_selfie(self, file_bytes: bytes, filename: str) -> str:
        """
        Uploads raw selfie bytes to the S3 bucket under the 'selfies/' prefix.
        Returns the storage path (key) on success.
        """
        storage_path = f"selfies/{filename}"
        try:
            logger.info(f"Uploading selfie to path: {storage_path}")
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=storage_path,
                Body=file_bytes,
                ContentType="image/jpeg"
            )
            return storage_path
        except ClientError as e:
            error_code = e.response.get('Error', {}).get('Code', 'Unknown')
            logger.error(f"S3 upload failed for {storage_path}: {error_code} - {e}")
            raise RuntimeError(f"Could not upload selfie to storage: {error_code}")
        except Exception as e:
            logger.error(f"Unexpected error during selfie upload: {e}")
            raise

    def delete_selfie(self, storage_path: str) -> None:
        """
        Deletes an object from S3. Used for cleanup if registration fails.
        """
        try:
            logger.info(f"Deleting object from path: {storage_path}")
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=storage_path)
        except ClientError as e:
            logger.warning(f"Failed to delete orphaned object {storage_path}: {e}")
        except Exception as e:
            logger.error(f"Unexpected error during object deletion: {e}")

# Thread-safe singleton instance
storage_service = StorageService()
