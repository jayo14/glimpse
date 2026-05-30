Product Requirement Document (PRD): Glimpse (MVP)

High-Performance Real-Time Photo Aggregation Platform

1. System Architecture Overview

                                  ┌───────────────────────────┐
                                  │     Next.js Web Client    │
                                  │   (Host Portal / Live)    │
                                  └─────────────┬─────────────┘
                                                │
                                                │ (HTTP / WS Protocol)
                                                ▼
┌─────────────────┐  (Multipart POST) ┌───────────┐  (Storage Engine) ┌─────────────────┐
│  Flutter Client │──────────────────>│  Django   │──────────────────>│  Cloud Storage  │
│ (Guest / Host)  │                   │  Backend  │                   │   (S3-backed)   │
└─────────────────┘                   └─────┬─────┘                   └─────────────────┘
                                            │
                                            │ (SQL Connections)
                                            ▼
                                      ┌───────────┐
                                      │ Postgres  │
                                      │  + Redis  │
                                      └───────────┘


The system architecture is structured into three specialized environments to maintain low latency, high throughput, and seamless client interactions under heavy parallel load conditions:

Backend (Django + Django REST Framework + Django Channels + Redis + PostgreSQL):
Acts as the unified state controller and media ingestion engine. It handles database transactions, token-based security, photo compression validation, EXIF/metadata sanitization, and live broadcasting via WebSockets over ASGI layers.

Web Frontend (Next.js + Tailwind CSS):
Serves as the host administrative control center, public landing portals, and the projector-optimized Live Wall engine. The Live Wall runs a persistent WebSocket state engine designed to maintain continuous rendering without DOM redraw performance bottlenecks.

Mobile Client (Flutter):
Provides a high-performance native camera interface. Compiled to native iOS and Android binaries for hosts/guests, and compiled to highly responsive Flutter Web to allow guests to instantly access the camera layout by scanning a physical QR code without installing native software packages.

2. Technical Feature Specifications

2.1 Backend API & Real-time Layer (Django)

Authentication & Permissions:

Standard Django Token or JWT-based authentication for Hosts.

Anonymous UUID token generation for guests mapped to active events, enabling highly secure access to upload endpoints without user profiles.

Real-time Synchronization:

ASGI execution server utilizing Django Channels.

Redis Channel Layer backend to manage WebSocket routing, message framing, and channel groups.

Image Processing & Ingestion Pipeline:

Accepts multi-part form payloads up to $20\text{MB}$ (though pre-compressed by clients).

Enforces secure EXIF stripping via Pillow to scrub private geographic location coordinates (GPS), camera hardware specifications, and personal identifying markers.

Automates secondary multi-format downscaling: Generates screen-optimized landscape dimensions ($1920 \times 1080$ at $85\%$ compression) and a quick-load grid thumbnail ($300 \times 300$ square crop).

Saves assets directly using Amazon S3 storage bucket parameters (or S3-compatible endpoints like MinIO/Supabase Storage) and delivers via localized CDN paths.

Real-time Event Broadcast:

On successful database write transactions inside PostgreSQL, Django Channels broadcasts a structured JSON frame (PHOTO_UPLOADED) over the active channel group address: ws/live-wall/<event_id>/.

2.2 Web Frontend (Next.js)

Host Management Portal:

A dashboard tailored for desktop viewports built with Next.js App Router hooks.

Features real-time usage metrics, event creation wizard cards, billing controllers, and SVG/PDF QR generation layers.

The Live Wall Projection Engine:

A full-screen view layout optimized for $1080\text{p}$, $4\text{K}$, and modern ultra-wide projection screens.

Maintains a persistent, auto-reconnecting WebSocket link back to the Django event group.

Uses a hardware-accelerated grid system. Upon receiving a PHOTO_UPLOADED payload, it pre-loads the asset in memory before animating it into the view.

Upon receiving a PHOTO_DELETED payload, it matches the item ID and initiates a $300\text{ms}$ CSS fade-out scale animation before purging the element from the DOM tree.

Moderation Dashboard:

A split-screen interface displaying a chronological stream of uploaded photos.

Includes instantaneous "Approve" / "Reject" triggers executing DELETE API requests to Django.

2.3 Mobile Client (Flutter)

Platform Targets:

Android and iOS native apps, alongside a mobile-optimized Flutter Web deployment.

Custom Camera Interface:

An ultra-low latency, full-bleed camera viewfinder layout overriding standard system chrome.

Features manual tap-to-focus, camera toggles (front/rear), high-dynamic range (HDR) optimization warnings, and a tactile shutter control action.

Hardware-Accelerated Client-Side Optimization:

Launches a background Dart isolate using native platform image processors.

Compresses images in memory to a maximum dimension boundary of $1920 \times 1080$ at $85\%$ JPEG rendering quality prior to multi-part HTTP transmission. This cuts average file sizes from $\approx 12\text{MB}$ to $\approx 1.5\text{MB}$, lowering data payloads by $87.5\%$.

Offline Queue Sync Engine:

A local SQLite schema (via sqflite or Hive) queuing captures if network drops occur.

Detects connection changes via connectivity listeners, systematically scheduling background uploads once network signal paths clear.

Host Mobile Companion Mode:

Allows authenticated hosts to switch profiles within the app to moderate photos in real time from their phones.

3. Database Schema Blueprint (PostgreSQL)

-- Profiles table extending Django's auth_user Model
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL, -- FK to auth_user table
    company_name VARCHAR(255) NULL,
    subscription_status VARCHAR(50) DEFAULT 'free' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Events table managing individual photo pools
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id INTEGER NOT NULL, -- FK to auth_user table
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME WITH TIME ZONE NOT NULL,
    end_time TIME WITH TIME ZONE NOT NULL,
    access_token UUID DEFAULT gen_random_uuid() NOT NULL, -- Public Guest upload token
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_event_host FOREIGN KEY (host_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

-- Photos table managing storage locations and moderation status
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL, -- FK to events table
    uploaded_by VARCHAR(100) NULL, -- Optional Guest name metadata
    storage_key VARCHAR(512) NOT NULL, -- Original S3 file system path
    optimized_url VARCHAR(512) NOT NULL, -- S3/CDN optimized screen size path
    thumbnail_url VARCHAR(512) NOT NULL, -- S3/CDN optimized thumbnail path
    is_approved BOOLEAN DEFAULT TRUE NOT NULL, -- Live moderation status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_photo_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);

-- Indexes for lightning-fast queries during live streams
CREATE INDEX idx_photos_event_id ON photos(event_id);
CREATE INDEX idx_photos_is_approved ON photos(is_approved);
CREATE INDEX idx_events_host_id ON events(host_id);


4. End-to-End API Specifications

4.1 Authentication Endpoints

POST /api/v1/auth/token/

Payload: {"username": "host_user", "password": "secure_password"}

Response: {"token": "f489f...28c", "profile": {"company_name": "EventCo"}}

4.2 Event Management Endpoints

POST /api/v1/events/ (Host Only)

Headers: Authorization: Token f489f...28c

Payload: {"title": "Wedding", "event_date": "2026-06-15", "start_time": "18:00:00Z", "end_time": "23:00:00Z"}

Response: {"id": "d0e302...f3b", "access_token": "a1b2c3...4f", "qr_code_url": "https://..."}

GET /api/v1/events/ (Host Only)

Headers: Authorization: Token f489f...28c

Response: [{"id": "d0e302...f3b", "title": "Wedding", "is_active": true}]

4.3 Ingestion & Media Endpoints

POST /api/v1/events/<event_id>/upload/ (Anonymous Public / Guest)

Headers: Authorization: Guest <access_token>, Content-Type: multipart/form-data

Payload: file: binary_data_stream, uploaded_by: "Optional Guest Name"

Response: {"id": "b0f79...12c", "status": "processing", "optimized_url": "https://cdn.glimpse..."}

GET /api/v1/events/<event_id>/photos/ (Public / Live Wall Initial Seed)

Response: [{"id": "b0f79...12c", "optimized_url": "https://...", "thumbnail_url": "https://...", "created_at": "..."}]

DELETE /api/v1/photos/<photo_id>/ (Host Only / Moderation Action)

Headers: Authorization: Token f489f...28c

Response: Status Code 204 No Content

4.4 WebSocket Frame Protocol

Connection URL: ws://<domain>/ws/live-wall/<event_id>/

Server Broadcast on Upload (PHOTO_UPLOADED):

{
  "type": "photo.uploaded",
  "data": {
    "id": "b0f797d0-1234-4321-abcd-9876543210ef",
    "optimized_url": "https://cdn.glimpse.com/photos/d0e3/optimized.jpg",
    "thumbnail_url": "https://cdn.glimpse.com/photos/d0e3/thumbnail.jpg",
    "uploaded_by": "John Doe",
    "created_at": "2026-05-30T16:45:00.000Z"
  }
}


Server Broadcast on Moderation Delete (PHOTO_DELETED):

{
  "type": "photo.deleted",
  "data": {
    "id": "b0f797d0-1234-4321-abcd-9876543210ef"
  }
}


AI Implementation Checklist

This checklist is structured progressively across architectural directories. Feed this into your AI environment to construct Glimpse step-by-step.

🟩 Phase 1: Django Backend Initialization & Core API

[ ] Initialize a virtual environment (python -m venv venv) and spin up a new Django project named glimpse_backend with a native application wrapper named events.

[ ] Install package dependencies: django, djangorestframework, channels, channels_redis, django-cors-headers, pillow, psycopg2-binary, and django-storages.

[ ] Configure settings.py databases array to map securely to PostgreSQL. Setup JWT / Token-based authentication strategies within REST_FRAMEWORK objects.

[ ] Configure settings.py CORS arrays to dynamically accept requests from both local and remote Next.js and Flutter target origins.

[ ] Create ASGI routing architecture (asgi.py) configured to direct traditional HTTP workloads to WSGI, and route active socket handshakes directly to Django Channels.

[ ] Write schema models within events/models.py detailing: UserProfile, Event, and Photo. Integrate UUID field structures as primary table keys.

[ ] Run terminal database commands (python manage.py makemigrations and python manage.py migrate) to generate database schemas.

[ ] Create serializers inside events/serializers.py containing field layouts for: UserProfileSerializer, EventSerializer, and PhotoSerializer.

[ ] Program API Views inside events/views.py allowing basic CRUD routes for Events, restricting execution actions to authenticated Django database profiles.

[ ] Create specialized authentication views returning unique, active user authentication token blocks in exchange for validated profile credentials.

🟩 Phase 2: Next.js Host & Live Wall Setup

[ ] Scaffold a Next.js App Router workspace named glimpse_web with TypeScript, Tailwind CSS, and lucide-react.

[ ] Construct an environment key map template (.env.local) declaring: NEXT_PUBLIC_API_URL and NEXT_PUBLIC_WS_URL.

[ ] Implement an Axios client instance configuration (utils/api.ts) using interceptor layers to auto-append bearer header authorization strings dynamically from browser storage context.

[ ] Program a responsive marketing homepage (app/page.tsx) detailing: product values, interface showcases, and tiered host product packaging options.

[ ] Create a Host Registration form page (app/register/page.tsx) and standard Login UI components (app/login/page.tsx) mapping to backend authentication APIs.

[ ] Scaffold the Host Dashboard interface routing tree (app/dashboard/layout.tsx and app/dashboard/page.tsx) featuring: sidebar routing channels, summary statistic grids, and event list arrays.

[ ] Build out an Event Creation Wizard modal component collection (app/dashboard/components/CreateEventModal.tsx) mapping fields to the Django POST endpoint.

[ ] Create a shareable event promotion component page layout (app/dashboard/event/[id]/page.tsx) rendering customizable flyer signs and dynamic QR blocks using the qrcode.react component package.

🟩 Phase 3: Flutter Mobile App Architecture

[ ] Execute command line routines initiating a clean Flutter mobile workspace configuration named glimpse_mobile.

[ ] Define the native Android platform hardware access rule permissions configuration list inside the native AndroidManifest.xml file:

<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />


[ ] Configure the native Apple deployment platform permissions manifest strings inside the native Info.plist container:

<key>NSCameraUsageDescription</key>
<string>Glimpse needs access to your camera to let you instantly snap and upload photos directly to the live event wall.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Glimpse needs access to your photo library to let you select and share moments to the live event wall.</string>


[ ] Scaffold the local project environment structure organizing components inside target directory patterns: lib/auth/, lib/events/, lib/camera/, lib/live_wall/, and lib/shared/.

[ ] Create a local persistent storage helper class mapping standard persistent device storage paths via the shared_preferences packages.

[ ] Design and program an HTTP connection utility module engine capable of automatically attaching bearer keys and managing system request actions safely.

[ ] Build out a landing screen controller managing navigation workflows based on native state checks (e.g., Guest Event Code Entry vs. Host Account login UI).

[ ] Code a native QR code scanner capture page interface utilizing packages like mobile_scanner or qr_code_scanner with scanning overlay graphics.

🟩 Phase 4: Image Ingestion Pipeline (Flutter to Django)

[ ] Write a dedicated background image compression class logic flow in Flutter utilizing background isolates (via the image library) to downscale raw camera imagery.

[ ] Configure isolated, background processing logic sequences targeting image output rules: enforce a $1920 \times 1080$ bounding box at a $85\%$ JPEG compression ratio.

[ ] Design the Flutter Guest View layout UI: Present an interactive viewfinder preview pane, a status-monitoring HUD layer, and simple shutter trigger UI components.

[ ] Build an on-device local database storage queuing cache schema layer utilizing the native sqflite package to safely buffer imagery captures during network drops.

[ ] Write a Django POST resource mapping endpoint (/api/v1/events/<id>/upload/) that processes multipart form payloads without requiring user authentication.

[ ] Code an image validation and sanitization helper utility in Django using Pillow that purges all EXIF metadata headers (e.g., GPS metadata coordinates, camera equipment names, and timestamps) before writing the file to physical disk space.

[ ] Program and connect S3 cloud pipeline integration libraries (such as django-storages and boto3) to map storage directly to cloud bucket destinations.

[ ] Structure the upload view response routine to return optimized public CDN image paths, raw database asset UUID keys, and creation dates back to the client.

🟩 Phase 5: Django Channels & WebSocket Engine

[ ] Configure the CHANNEL_LAYERS routing parameters inside settings.py utilizing the channels_redis package pointing to an active Redis instance.

[ ] Create a dedicated socket connection consumer file (events/consumers.py) initiating a subclass of AsyncWebsocketConsumer named LiveWallConsumer.

[ ] Program connection handshake handling callbacks inside LiveWallConsumer validating the event parameters mapped to active PostgreSQL data keys.

[ ] Create a custom authentication middleware class to parse and validate database host authentication tokens passed in the socket query strings.

[ ] Build out the ASGI network path connection mapping routes file (events/routing.py) mapping target socket entry channels /ws/live-wall/<event_id>/ directly to your consumers.

[ ] Connect broadcast mechanisms inside the HTTP file upload controller to fire custom photo.uploaded JSON events to the active Redis event channels.

[ ] Implement explicit error containment routines to drop connections if client handshakes are attempted with invalid event parameters.

🟩 Phase 6: Real-time Next.js Live Wall

[ ] Create a dedicated full-screen Next.js route viewport designed for project use (app/event/[id]/live-wall/page.tsx).

[ ] Construct an initial data initialization call to fetch historical event photos from /api/v1/events/<id>/photos/ to render initial layout grids.

[ ] Program a resilient React state custom WebSocket connection control hook (hooks/useWebSocket.ts) featuring automated retry intervals and status indicators.

[ ] Write a robust state management layout using a React state reducer to manage the live feed state array (prepending incoming upload streams, removing flagged assets).

[ ] Assemble a responsive visual grid display using Tailwind CSS animations (transition-all duration-500 ease-out) to smoothly inject newly appended photo cards.

[ ] Design an interactive onboarding overlay screen layout highlighting QR code graphic details for events containing empty photo grids.

🟩 Phase 7: Multi-Platform Live Moderation

[ ] Program the desktop Web Moderation layout module inside Next.js (app/dashboard/event/[id]/moderation/page.tsx).

[ ] Build an interactive grid board tracking real-time upload progress, featuring "Approve" and "Reject" actions on hover.

[ ] Configure event handler actions on the moderation buttons to call the Django DELETE API (DELETE /api/v1/photos/<id>/).

[ ] Code the Django DELETE view route logic to safely purge target items off cloud S3 assets, update DB state, and broadcast a PHOTO_DELETED payload over active socket channels.

[ ] Update the Live Wall WebSocket event hook code on the projector page client file to correctly parse PHOTO_DELETED payloads and smoothly remove the target card.

[ ] Build out a companion view layout in the Flutter mobile codebase permitting authenticated Host profiles to monitor and delete uploads directly from their phones.

🟩 Phase 8: Testing, Hardening & Multi-Repo Deployment

[ ] Build an automated local development container map utilizing a standard docker-compose.yml defining synchronized Django backend service runtimes, Postgres storage nodes, and Redis network routing layers.

[ ] Write integration test cases within the Django environment verifying media processing pipelines, EXIF data scrubbing, and endpoint authentication rules.

[ ] Implement robust retry mechanisms inside the Flutter network library utilizing standard exponential backoff scheduling routines.

[ ] Deploy the Django application server layer over high-performance infrastructure configurations (such as DigitalOcean, AWS Elastic Beanstalk, or Render) utilizing Gunicorn alongside Daphne for handling WebSocket protocols.

[ ] Deploy the Next.js project codebase directly to Vercel, mapping appropriate production API and live WebSocket address indicators securely to system environments.

[ ] Perform a live, end-to-end integration test: Scan the QR code using a physical smartphone camera, take a picture, and verify it updates on the Next.js Live Wall within 1.5 seconds.
