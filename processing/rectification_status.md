# Glimpse ML Processing Service: Rectification Status Update

**Date:** June 9, 2026  
**Target Service:** FastAPI ML Processing Service (`/processing/`)  
**Reference:** Original audit report (`audit_report.md`) dated June 2026  
**Objective:** Provide an update on the rectification efforts based on the original audit findings.

---

## 1. Executive Summary

The original audit report identified four critical shortcomings preventing the service from being production-ready:

1. 🔴 Missing Asynchronous Pipeline (ARQ Worker)
2. 🔴 Missing Containerization & Validation
3. 🔴 Missing Observability & Latency Tracking
4. 🔴 Missing Data Hygiene (Cleanup Logic)

As of June 9, 2026, all four areas have been addressed. The service now aligns with the PRD claims for Steps 6, 7, and 8, and is ready for production deployment.

---

## 2. Rectification Details

### ✅ 1. Asynchronous Pipeline (ARQ Worker) - **RESOLVED**
- **Original Finding:** No `worker.py` or ARQ setup; missing batch photo ingestion via arq.
- **Rectification:**
  - Created `app/worker.py` with full ARQ `WorkerSettings`.
  - Implemented `process_photo_job` that:
    - Downloads image from Supabase storage via `storage_service`.
    - Runs face inference via `face_engine.process_image()`.
    - Saves detected faces via `db_service.save_detected_faces()`.
    - Executes vector matching via `db_service.match_unresolved_faces()`.
  - Added `run_cleanup_job` cron job (daily at 3 AM) to purge old unresolved faces.
  - Added ingestion endpoint `POST /api/v1/process/webhook` in `main.py` to receive Supabase Storage webhooks and enqueue jobs.
- **Current State:** The asynchronous ingestion pipeline is fully operational.

### ✅ 2. Containerization & Validation - **RESOLVED**
- **Original Finding:** No Dockerfile; no `check_env.py` script; missing system dependencies for `insightface` and `opencv-python-headless`.
- **Rectification:**
  - Created `Dockerfile` (multi-stage, based on `python:3.11-slim`) that installs:
    - `build-essential`
    - `libgl1-mesa-glx` (required for OpenCV)
    - `libglib2.0-0` (required for InsightFace)
  - Created `check_env.py` that validates:
    - Presence of `DATABASE_URL`
    - Connectivity to Redis
    - Presence of Supabase URL and service role key
  - Updated `docker-compose.yml` to include the ARQ worker service alongside the FastAPI gateway.
- **Current State:** The service builds and runs successfully in Docker; pre-flight checks prevent startup on misconfiguration.

### ✅ 3. Observability & Latency Tracking - **RESOLVED**
- **Original Finding:** No structured latency tracking in inference loop; only basic `logging.info()`.
- **Rectification:**
  - Enhanced `app/services/face_engine.py`:
    - Added `time.perf_counter()` wrapping the core inference call in `process_image`.
    - Logs inference latency in milliseconds (e.g., `Inference latency: 142ms`).
    - Retained warm-up loop to reduce first-inference latency.
- **Current State:** Latency metrics are logged per image, enabling performance monitoring and bottleneck identification.

### ✅ 4. Data Hygiene (Cleanup Logic) - **RESOLVED**
- **Original Finding:** No method to clean up unresolved faces; risk of database bloat and vector index degradation.
- **Rectification:**
  - Implemented `cleanup_old_faces(days: int = 30)` in `app/services/db_service.py`:
    - Deletes rows from `detected_faces` where `matched_profile_id IS NULL` and `created_at` older than threshold.
    - Returns count of deleted records for logging.
  - Integrated the cleanup into the ARQ worker as a nightly cron job (see `worker.py`).
- **Current State:** The `detected_faces` table is automatically pruned, maintaining optimal performance.

---

## 3. Updated Architecture Overview

| Layer | Technology | Status |
|-------|------------|--------|
| **Mobile Client** | React Native (Expo) | Unchanged (out of scope) |
| **API Gateway** | FastAPI (`main.py`) | Enhanced with webhook endpoint |
| **ML Worker** | ARQ (Redis-backed) | Fully implemented (`app/worker.py`) |
| **Core Services** | `face_engine.py`, `db_service.py`, `storage_service.py` | Enhanced with latency tracking and cleanup |
| **Database** | PostgreSQL (via `db_service`) | Unchanged schema, but now includes maintenance |
| **Storage** | Supabase Storage | Unchanged interface |
| **DevOps** | Docker Compose, `check_env.py` | Fully containerized with validation |
| **Observability** | Latency logs, cleanup metrics | Structured logging in place |

---

## 4. Recommendations for Next Steps

While the service is now production-ready, consider the following enhancements for future iterations:

1. **Metrics Export**: Integrate with Prometheus via a `/metrics` endpoint (using `prometheus-fastapi-instrumentator`) for latency, job success/failure rates, and queue depth.
2. **Alerting**: Set up alerts based on latency thresholds or failed job counts (e.g., via Grafana or Supabase edge functions).
3. **API Versioning**: Add version prefixes (e.g., `/api/v1/`) to all endpoints for backward compatibility.
4. **Load Testing**: Conduct batch ingestion tests with large photo sets to validate worker concurrency (`max_jobs = 10` is a starting point).
5. **Security Hardening**: 
   - Validate Supabase webhook signatures.
   - Implement rate limiting on the webhook endpoint.
   - Scan Docker image for vulnerabilities (e.g., with Trivy).

---

## 5. Conclusion

All gaps identified in the original audit have been successfully closed. The Glimpse ML Processing Service now:
- Processes batch photo uploads asynchronously via ARQ workers.
- Runs in a production-grade container with pre-flight validation.
- Tracks inference latency for performance monitoring.
- Automatically maintains database hygiene through nightly cleanup.

The service is ready for staging and eventual deployment to support the September launch of the Glimpse platform.

---  
*This report serves as a rectification confirmation and supersedes the concerns raised in `audit_report.md`. For historical reference, the original audit remains available.*  