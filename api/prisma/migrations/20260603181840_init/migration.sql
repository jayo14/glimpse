-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('HOST', 'PHOTOGRAPHER', 'GUEST');

-- CreateEnum
CREATE TYPE "ProcessStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('PHOTOGRAPHER', 'GUEST');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "UserRole",
    "avatar_url" TEXT,
    "face_embedding" vector(512),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "host_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "guest_photo_limit" INTEGER NOT NULL DEFAULT 15,
    "event_start" TIMESTAMP(3),
    "event_end" TIMESTAMP(3),
    "qr_code_url" TEXT,
    "invite_token" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_collaborators" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "photographer_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_registrations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "guest_id" UUID NOT NULL,
    "selfie_path" TEXT,
    "shots_used" INTEGER NOT NULL DEFAULT 0,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guest_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "uploaded_by" UUID,
    "role_type" "RoleType" NOT NULL,
    "storage_path" TEXT NOT NULL,
    "taken_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processing_status" "ProcessStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_invite_token_key" ON "events"("invite_token");

-- CreateIndex
CREATE UNIQUE INDEX "event_collaborators_event_id_photographer_id_key" ON "event_collaborators"("event_id", "photographer_id");

-- CreateIndex
CREATE UNIQUE INDEX "guest_registrations_event_id_guest_id_key" ON "guest_registrations"("event_id", "guest_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_collaborators" ADD CONSTRAINT "event_collaborators_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_collaborators" ADD CONSTRAINT "event_collaborators_photographer_id_fkey" FOREIGN KEY ("photographer_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_registrations" ADD CONSTRAINT "guest_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_registrations" ADD CONSTRAINT "guest_registrations_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
