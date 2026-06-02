# Glimpse

AI-powered event media platform for photographers, hosts, and guests. Glimpse automates photo delivery using facial recognition, allowing guests to receive their photos instantly.

---

## 📖 Documentation

- [Product Requirements Document (PRD)](PRD.md)
- [Design System & Branding (DESIGN.md)](DESIGN.md)

---

## 🛠️ Tech Stack

- **Mobile**: Flutter (Riverpod, GoRouter)
- **Frontend**: Next.js 15 (App Router, Tailwind CSS)
- **ML Worker**: FastAPI (InsightFace, ArcFace)
- **Database**: Supabase / PostgreSQL (pgvector)
- **Infrastructure**: Docker, Redis

---

## 📂 Repository Structure

```
.
├── mobile/             # Flutter mobile application (Host, Photographer, Guest)
├── frontend/           # Next.js web application (Guest PWA)
├── processing/         # FastAPI ML worker for face detection & matching
├── supabase/           # Database migrations and configuration
├── api/                # Scaffolded API gateway
├── docker-compose.yml  # Local infrastructure (Postgres + pgvector, Redis)
├── PRD.md              # Product Requirements Document
└── DESIGN.md           # Design tokens and UI guidelines
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- [Flutter SDK](https://docs.flutter.dev/get-started/install)
- [Node.js 20+](https://nodejs.org/)
- [Python 3.12+](https://www.python.org/)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/glimpse.git
   cd glimpse
   ```

2. **Start Infrastructure**
   ```bash
   docker-compose up -d
   ```

3. **Setup ML Worker**
   ```bash
   cd processing
   # Setup virtual environment and install dependencies
   # python3 -m venv venv
   # source venv/bin/activate
   pip install -r requirements.txt
   # Start the worker: uvicorn main:app --reload
   ```

4. **Setup Mobile App**
   ```bash
   cd ../mobile
   flutter pub get
   # Run the app: flutter run
   ```

5. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   # Start the dev server: npm run dev
   ```

---

## ✨ Features

- **Instant Reveal**: AI-powered face matching for guest photos.
- **Photographer Dashboard**: Bulk upload and event management.
- **Guest Hub**: Personalized galleries with real-time updates.
- **Live Wall**: Real-time slideshow of event photos.
- **Privacy First**: Secure biometric handling and easy data purge options.

---

## 🤝 Contributing

Please read the [PRD](PRD.md) and [DESIGN.md](DESIGN.md) before submitting any pull requests to ensure alignment with the product vision and design standards.

---

## ⚖️ License

Internal Proprietary - All Rights Reserved.
