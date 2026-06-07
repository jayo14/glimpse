import threading
import logging
import cv2
import numpy as np
from insightface.app import FaceAnalysis
import os
import time
from app.core.config import settings

logger = logging.getLogger(__name__)

class FaceEngine:
    """
    Singleton class for ML inference using InsightFace for face detection and embedding extraction.
    Implements a lazy initialization pattern.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(FaceEngine, cls).__new__(cls)
                cls._instance._app = None
                cls._instance._init_lock = threading.Lock()
        return cls._instance

    @property
    def app(self):
        if self._app is None:
            with self._init_lock:
                if self._app is None:
                    self.prepare_engine()
        return self._app

    def prepare_engine(self, ctx_id: int = -1, det_size: tuple = (640, 640)):
        """
        Initializes the InsightFace model, downloads if missing, and warms up the engine.
        ctx_id: -1 for CPU, >= 0 for GPU ID.
        """
        try:
            model_path = os.path.abspath(settings.MODELS_DIR)
            logger.info(f"Initializing FaceAnalysis with root: {model_path}")

            # name='buffalo_l' refers to the model pack containing SCRFD and ArcFace
            app = FaceAnalysis(
                name='buffalo_l',
                root=model_path,
                providers=['CPUExecutionProvider']
            )

            # This will download the model if not found in root/models/
            app.prepare(ctx_id=ctx_id, det_size=det_size)

            # Warm up with a dummy image to trigger internal allocations and reduce latency
            logger.info("Warming up FaceEngine...")
            dummy_img = np.zeros((*det_size, 3), dtype=np.uint8)
            app.get(dummy_img)

            self._app = app
            logger.info("FaceEngine initialization and warm-up complete.")

        except Exception as e:
            logger.error(f"Failed to initialize FaceEngine: {e}")
            raise

    def process_image(self, img_bytes: bytes) -> list[dict]:
        """
        Decodes image bytes, detects faces, and extracts normalized embeddings.
        Returns a list of dicts containing bbox, det_score, and embedding.
        """
        start_time = time.perf_counter()

        try:
            # Convert raw bytes to numpy array for OpenCV without disk writes
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                logger.warning("Failed to decode image. Potential corruption or invalid format.")
                return []

            # Perform inference
            faces = self.app.get(img)

            results = []
            for face in faces:
                # Filter by detection confidence (det_score)
                if face.det_score < settings.FACE_DETECTION_THRESHOLD:
                    continue

                # Convert bounding box to native Python integers
                # bbox is [x1, y1, x2, y2]
                bbox = [int(coord) for coord in face.bbox]

                # InsightFace embeddings are typically already close to unit length,
                # but we ensure L2 normalization if needed or just pass as list.
                # 'normed_embedding' is usually provided by ArcFace in buffalo_l
                embedding = face.normed_embedding.tolist()

                results.append({
                    "bbox": bbox,
                    "det_score": float(face.det_score),
                    "embedding": embedding
                })

            end_time = time.perf_counter()
            inference_ms = (end_time - start_time) * 1000

            logger.info(
                f"Inference completed in {inference_ms:.1f}ms — "
                f"{len(faces)} face(s) detected, {len(results)} passed quality filter."
            )

            # Add inference time to each result if needed, or just log it
            for res in results:
                res["inference_ms"] = inference_ms

            return results

        except Exception as e:
            logger.error(f"Error during image processing: {e}", exc_info=True)
            return []

# Thread-safe singleton accessor
face_engine = FaceEngine()
