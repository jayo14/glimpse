-- Migration: Create detected_faces table and pgvector indexes

-- 1. Ensure pgvector extension exists
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create detected_faces table
CREATE TABLE IF NOT EXISTS public.detected_faces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_id UUID NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    embedding vector(512) NOT NULL,
    bounding_box JSONB NOT NULL,
    confidence FLOAT NOT NULL,
    matched_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create HNSW index on detected_faces.embedding
-- m=16, ef_construction=64 for sub-second matching at scale
CREATE INDEX IF NOT EXISTS idx_detected_faces_embedding_hnsw
ON public.detected_faces
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Create HNSW index on profiles.face_embedding
CREATE INDEX IF NOT EXISTS idx_profiles_face_embedding_hnsw
ON public.profiles
USING hnsw (face_embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 5. Create partial B-tree index on event_id for unresolved faces
CREATE INDEX IF NOT EXISTS idx_detected_faces_unresolved_event
ON public.detected_faces (event_id)
WHERE matched_profile_id IS NULL;
