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
