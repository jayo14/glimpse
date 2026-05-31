Project: Glimpse

Author: Solo Developer (assisted by AI Agents)

Status: Approved for Scaffolding

Version: 1.0.0

Target Architecture: Next.js (Web Frontend), Flutter (Mobile App), Supabase (Auth, DB, Vector, Storage, Realtime), FastAPI (Python ML Background Worker + Redis queue).

1. Executive Summary & Vision

Glimpse is an AI-powered event photography ecosystem that bridges the gap between premium professional imagery and raw, candid guest memories in real-time. It completely eliminates the friction of searching through massive, unorganized cloud folders by offering a personalized, real-time media delivery pipeline.

The Hybrid Innovation

Glimpse combines two distinct behavioral mechanics into one seamless platform:

The Core Glimpse Engine (Centralized AI Curator): Delivers professional photographer photos to individual guests' personal, private galleries instantly using real-time facial recognition matching.

The Glimpse Social Lens (Decentralized Candid Camera): Captures the fun, gamified spirit of a disposable camera (Once concept). Guests take direct, authentic, film-filtered photos with a strict limit enforced by the host. If a guest takes a photo of someone else at the event, Glimpse's AI processes it and delivers it instantly to that target guest's device.

2. User Roles & Core Journeys

               ┌────────────────────────┐
               │    HOST (Flutter)      │
               └───────────┬────────────┘
                           │ (Creates Event / Sets Guest limits)
                           ▼
             ┌─────────────┴─────────────┐
             │   EVENT REGISTRY / DB     │
             └─────────────┬─────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
┌──────────────────┐               ┌──────────────────┐
│ PHOTOGRAPHER     │               │      GUEST       │
│ (Web/Flutter)    │               │    (Next.js)     │
└────────┬─────────┘               └────────┬─────────┘
         │ (Bulk Uploads)                   │ (Onboarding Selfie)
         ▼                                  ▼
┌──────────────────┐               ┌──────────────────┐
│ Professional     │               │   Frictionless   │
│ Quality Matches  │               │   Candid Camera  │
└──────────────────┘               └──────────────────┘


A. The Host (Flutter Mobile)

Persona: Event planner, corporate host, couple getting married, or student organization leads.

Journey:

Authenticates via OAuth or Email inside the mobile application.

Spawns an Event (e.g., "AI Tech Summit 2026").

Customizes settings: Sets guest count, photo limitations (e.g., maximum 15 shots per guest), and styling parameters.

Generates two key gateway assets:

Photographer Invite Link: Distributed to professional crew.

Event QR Code: Displayed on tables/screens for attendees.

B. The Photographer (Flutter/Web Dashboard)

Persona: Freelance or agency event photographers.

Journey:

Clicks the Invite Link and links their account to the specific Event ID.

Uploads raw or high-res JPG/PNG exposures directly during or immediately after the event.

Monitors live ingestion status, verifying how many images are successfully matching faces.

C. The Guest (Next.js Responsive Web View / App Clip)

Persona: Event attendee.

Journey:

Scans the Event QR code. No App Store download or manual sign-up/password creation required.

Submits an onboarding selfie and types their name to instantiate a session-bound profile.

Accesses a clean, private bento-grid dashboard consisting of two distinct components:

"My Studio Portfolio": High-fidelity, real-time matched professional photos.

"Candid Lens": A customized, built-in camera UI with high-quality film presets and a strictly managed photo allowance counter.

3. Technical System Architecture

                                  ┌───────────────────────────┐
                                  │   Guest / Photographer    │
                                  │    Client Browser / App   │
                                  └─────────────┬─────────────┘
                                                │
                                    (1. Direct Secure Upload)
                                                ▼
┌───────────────────┐             ┌───────────────────────────┐
│ FastAPI Web API   │             │     Supabase Storage      │
│ (api.glimpse.com) │             │  (event-uploads bucket)   │
└────────┬──────────┘             └─────────────┬─────────────┘
         │                                      │
         │ (2. API Requests)            (2. Database Trigger)
         ▼                                      ▼
┌─────────────────────────────────────────────────────────────┐
│                       Supabase DB / PG                      │
└────────────────────────┬────────────────────────────────────┘
                         │
               (3. Processing Webhook)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Redis Message Queue / Broker                │
└────────────────────────┬────────────────────────────────────┘
                         │
                 (4. Worker Fetch)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              FastAPI AI Worker (InsightFace)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                 (5. Write Back)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Supabase Realtime WebSockets Push to UI           │
└─────────────────────────────────────────────────────────────┘


The system uses an event-driven design to ensure heavy machine learning operations do not block frontend responsiveness.

Next.js Client (Uploads): Requests a presigned, client-side S3 URL from Supabase, then pushes compressed binary data directly to Supabase Storage.

Supabase Database Trigger: Fires an event when an image insert is committed to the photos table.

Queue Ingestion: Pushes a background job to a Redis Queue running ARQ or Celery.

FastAPI Worker (De-coupled ML Thread): Resolves task entries from Redis, retrieves images, executes facial embedding extractions, runs a cosine similarity vector search on Postgres, and updates matching profiles.

Realtime Broadcast: Supabase Realtime detects database table alterations (INSERT/UPDATE) and streams live images directly to active guest WebSockets.

4. Database Schema Specification (Supabase PostgreSQL)

This schema configuration utilizes the PostgreSQL pgvector extension.

-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Profiles Table (Hosts, Photographers, Guests)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('host', 'photographer', 'guest')) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Events Table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    guest_photo_limit INT DEFAULT 15,
    event_start TIMESTAMP WITH TIME ZONE,
    event_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Event Collaborators (Allows multiple photographers per event)
CREATE TABLE public.event_collaborators (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    photographer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (event_id, photographer_id)
);

-- 4. Photos Master Storage Index
CREATE TABLE public.photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    role_type TEXT CHECK (role_type IN ('photographer', 'guest')) NOT NULL,
    storage_path TEXT NOT NULL,
    taken_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Detected Faces (Main mapping structure containing face vectors)
CREATE TABLE public.detected_faces (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    photo_id UUID REFERENCES public.photos(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    embedding vector(512) NOT NULL, -- Matched to 512-dim ArcFace/InsightFace embeddings
    matched_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    bounding_box JSONB, -- Coordinates of the face within the original image [x1, y1, x2, y2]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indexes for Vector Operations
-- Creates a High-Performance Index for Cosine Distance Calculations
CREATE INDEX ON public.detected_faces USING hnsw (embedding vector_cosine_ops);


5. Machine Learning & Face Matching Specifications

The background worker utilizes a high-performance Python runtime wrapping the InsightFace toolkit.

AI Processing Flow

┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│   Load Image into CPU   │ ──> │ Face Detection (SCRFD)  │ ──> │ Feature Extraction      │
│   Memory (Resized)      │     │ Find bounding boxes     │     │ ArcFace 512-dim Vector  │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘


Onboarding Vector Creation:

When a guest completes onboarding, their registration selfie is sent through the model.

A single high-confidence embedding vector ($V_g \in \mathbb{R}^{512}$) is generated and stored directly in the guest's profile.

Ingestion Loop (Photographer / Guest uploads):

For each processed photo, the worker executes a face detection loop.

For every detected face $f_i$ with an alignment confidence $> 0.85$, generate a 512-dimensional embedding $V_{f_i}$.

Store raw rows inside detected_faces.

Similarity Index Evaluation:

Matches are found using Cosine Similarity:


$$\text{Cosine Distance} = 1 - \frac{A \cdot B}{\|A\| \|B\|}$$

The PostgreSQL matching query:

-- Find matches with an empirical cosine distance threshold (typically < 0.35)
UPDATE public.detected_faces
SET matched_profile_id = 'target_guest_uuid'
WHERE event_id = 'current_event_uuid'
  AND matched_profile_id IS NULL
  AND (embedding <=> 'guest_selfie_embedding_vector') < 0.35;


6. Functional Requirements

Epic 1: High-Performance Media Pipeline

F-101 (Client-side Compression): Frontend clients must resize images to a maximum width/height of 2048px on the GPU canvas prior to file transfer.

F-102 (Asynchronous Handshake): All photo uploads must directly write to storage buckets, avoiding in-memory holding loops on API gateway servers.

F-103 (Auto-Rotation/EXIF Retention): Metadata parsers must retain native rotation angles and photographer EXIF data.

Epic 2: The Guest Social Camera (Nostalgia Engine)

F-201 (Client Media Access): Web views must securely interface with native camera layers using getUserMedia. Uploads from pre-existing system rolls must be physically blocked.

F-202 (Real-time Custom Overlays): Render a non-destructive custom CSS color-graded filter over the active viewport to mimic analog retro-grain profiles.

F-203 (Limit Constraints): The client application must verify the photo-allocation count from the events table before unlocking the shutter. Once a guest's transaction table contains guest_photo_limit instances of photos, the shutter locks and displays a friendly, gamified message.

Epic 3: Real-time UI Delivery

F-301 (Supabase Channel Subscription): The Next.js frontend must instantiate a dedicated WebSocket subscription focused specifically on changes matching the user's ID.

F-302 (Fade-In Transitions): Matched images must append gracefully into the user's screen space using animations to enhance the experience.

7. Safety, Consent, & Performance Benchmarks

Privacy & Consent (GDPR Compliance)

Rule S-101 (Temporary Assets): No guest facial embeddings are persisted permanently beyond the scope of active event processing.

Rule S-102 (Account-Free Deletion): Every guest view contains a conspicuous "Purge My Data" interface action. Triggering this deletes the temporary guest profile, their onboarding selfie, and wipes all matched foreign keys on associated tables.

Key Performance Indicators (KPIs)

Latency: The duration between a photographer uploading a batch and a guest receiving their first automated notification on their mobile device must be under $6.0$ seconds for standard web images under normal queue loads.

Matching Accuracy: System false-positive matching rates must sit below $0.01\%$.
