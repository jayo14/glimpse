# EventLens

AI-powered event media platform for photographers, hosts, and guests.

## Architecture

- **Frontend**: Next.js 15 (App Router, TailwindCSS, shadcn/ui)
- **Backend**: Django REST Framework
- **Database**: PostgreSQL with pgvector
- **Task Queue**: Celery & Redis
- **Auth**: JWT (RS256)

## Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+

### Quick Start

1. **Clone the repo**
2. **Setup Backend**
   - `cd backend`
   - `python -m venv venv && source venv/bin/activate`
   - `pip install -r requirements.txt`
   - `docker-compose up -d` (from root)
   - `python manage.py migrate`
   - `python manage.py runserver`
3. **Setup Frontend**
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Features (MVP)
- Bulk photo upload
- AI face detection & clustering (Mocked for MVP)
- Guest selfie search
- Photographer dashboard
- Branded galleries
