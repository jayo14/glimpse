# Glimpse ML Processing Service: Architectural Audit & Rectification Plan

**Date:** June 2026
**Target Service:** FastAPI ML Processing Service (`/processing/`)
**Objective:** Audit the current codebase against the PRD requirements and propose a strategy to bring the service to production readiness.

---

## 1. Executive Audit Summary

I have conducted a thorough review of the codebase located in the `/processing/` directory, including `main.py`, `face_engine.py`, `db_service.py`, and `storage_service.py`. 

**The Verdict:** The service successfully implements the synchronous onboarding flow (Step 5 in PRD) and provides a clean, thread-safe architectural scaffold with singletons for the database, storage, and face inference engine. However, the service is **not yet production-ready** and falls significantly short of the PRD claims for Steps 6, 7, and 8. 

The asynchronous ingestion loop, containerization, and observability requirements are completely absent from the current codebase.

---

## 2. Identified Faults & Shortcomings

### 🔴 Missing Asynchronous Pipeline (ARQ Worker)
- **PRD Claim:** "Offloaded batch photo ingestion to arq (Redis-backed worker)"
- **Reality:** There is no `worker.py` or ARQ setup. The system currently has no way to process batch photo uploads triggered by Supabase webhooks. The entire core functionality of matching guests from photographer uploads is missing.

### 🔴 Missing Containerization & Validation
- **PRD Claim:** "Finalized deployment readiness with production-grade Dockerfiles, orchestration, and secrets validation logic."
- **Reality:** There is no `Dockerfile` in the processing folder, nor is there a `check_env.py` script. Deploying `insightface` and `opencv-python-headless` requires specific system-level libraries (like `libgl1-mesa-glx`) which must be defined in a Dockerfile.

### 🔴 Missing Observability & Latency Tracking
- **PRD Claim:** "Observability: Latency tracking is integrated into the inference loop to provide data-driven insight..."
- **Reality:** `face_engine.py` uses basic `logging.info()`. There is no structured latency tracking (`time.perf_counter()`) measuring inference times or vector search performance.

### 🔴 Missing Data Hygiene (Cleanup Logic)
- **PRD Claim:** "The cleanup_old_tasks method prevents the detected_faces table from becoming an infinite bottleneck..."
- **Reality:** `db_service.py` lacks any methods for cleaning up unresolved or outdated faces, risking database bloat and performance degradation in the vector index.

---

## 3. Plan & Strategy for Correction

To align the codebase with the PRD and prepare it for the September launch, I propose the following implementation phases.

### Phase 1: Build the ARQ Worker Pipeline
1. **Create `app/worker.py`**: Configure ARQ `WorkerSettings` pointing to `settings.REDIS_URL`.
2. **Implement Task Logic**: Create `async def process_photo_job(ctx, photo_id, event_id, storage_path)`:
   - Use `storage_service.download_image()`
   - Run inference via `face_engine.process_image()`
   - Save detected faces via `db_service.save_detected_faces()`
   - Execute the pgvector match via `db_service.match_unresolved_faces()`
3. **Create Ingestion Endpoint**: Add `POST /api/v1/process/webhook` in `main.py` that receives the Supabase Storage webhook and enqueues the `process_photo_job` to Redis.

### Phase 2: Add Observability & Hygiene
1. **Enhance `FaceEngine`**: Wrap the inference call in `process_image` with `time.perf_counter()` and log the execution time (e.g., `Inference latency: 145ms`).
2. **Add Cleanup Logic**: Create a `cleanup_old_faces(days=30)` method in `db_service.py` that deletes rows from `detected_faces` where `matched_profile_id IS NULL` and `created_at` is older than the threshold.
3. **Register Cron Task**: Add the cleanup method to the ARQ worker's `cron_jobs` configuration to run nightly.

### Phase 3: Containerization & Pre-flight Checks
1. **Create `Dockerfile`**: Write a multi-stage Dockerfile based on `python:3.11-slim`. Include essential system packages: `build-essential`, `libgl1-mesa-glx`, and `libglib2.0-0` (required for OpenCV and InsightFace).
2. **Create `check_env.py`**: A pre-start script that validates `DATABASE_URL`, connects to Redis, and ensures Supabase keys are present.
3. **Update `docker-compose.yml`**: Ensure the local environment definition includes the new ARQ worker process alongside the FastAPI gateway.
