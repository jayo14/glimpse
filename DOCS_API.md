# Glimpse API Reference

This document provides a comprehensive overview of the APIs used in the Glimpse project. The system consists of two primary backend services:

1.  **Node.js API (`api/`):** Handles user authentication, event management, and business logic.
2.  **FastAPI Processing Service (`processing/`):** Handles ML-heavy tasks like face detection, embedding generation, and background processing.

---

## 1. Node.js API

The Node.js API is the primary entry point for the frontend and mobile applications. It uses Swagger for interactive documentation.

-   **Base URL:** `/api/v1`
-   **Interactive Documentation:** `/api-docs` (Available when the server is running)

### Authentication
Most endpoints require authentication using Supabase JWT.
-   **Header:** `Authorization: Bearer <JWT_TOKEN>`
-   **Refresh Mechanism:** Uses the `/auth/refresh` endpoint to rotate tokens.

### Main Modules
-   **Auth:** Registration, login, password reset, and OAuth (Google).
-   **User:** Profile management and role assignment.
-   **Event:** Event creation, media upload requests (signed URLs), and collaborator management.
-   **Waitlist:** Public endpoint for early access signups.

---

## 2. FastAPI Processing Service

The processing service handles computationally expensive operations. It interacts with the Node.js API via webhooks and background jobs (using Redis/ARQ).

-   **Base URL:** `http://localhost:8000` (Default development port)

### Endpoints

#### `GET /health`
Returns the health status of the service, including database and Redis connectivity.

-   **Response (200):**
    ```json
    {
      "status": "healthy",
      "checks": {
        "database": true,
        "redis": true,
        "face_engine_loaded": true
      }
    }
    ```

#### `POST /api/v1/process/selfie`
Used for synchronous guest selfie onboarding. Detects a face and stores the embedding.

-   **Content-Type:** `multipart/form-data`
-   **Request Body:**
    -   `profile_id` (string): Unique identifier for the guest.
    -   `event_id` (string): The event they are joining.
    -   `file` (file): The selfie image.
-   **Success Response (200):** `{"status": "success"}`
-   **Error Responses:**
    -   `400`: No face detected or multiple faces detected.
    -   `500`: Internal server error during storage or database write.

#### `POST /api/v1/process/webhook`
Webhook called by the Node.js API to enqueue a new photo for background processing (face detection and matching).

-   **Content-Type:** `application/json`
-   **Request Body:**
    ```json
    {
      "photo_id": "uuid",
      "event_id": "uuid",
      "storage_path": "path/to/photo.jpg"
    }
    ```
-   **Success Response (200):**
    ```json
    {
      "status": "enqueued",
      "photo_id": "uuid"
    }
    ```
-   **Error Responses:**
    -   `503`: Redis service unavailable.
    -   `500`: Failed to enqueue background job.

---

## 3. Architecture & Data Flow

1.  **Media Upload:** Frontend requests a signed URL from Node.js API (`/event/:eventId/media-upload`).
2.  **Upload:** Frontend uploads directly to S3/Storage.
3.  **Trigger:** Node.js API calls the Processing Service webhook (`/api/v1/process/webhook`).
4.  **Processing:** Processing Service enqueues an ARQ job.
5.  **Job Execution:** Worker downloads the image, detects faces, generates embeddings, and matches them against registered guests in the database.
