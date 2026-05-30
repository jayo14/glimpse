import time
import random
import numpy as np
import os
from celery import shared_task
from .models import Face, Cluster
from events.models import Photo
from .utils import remove_exif
from django.core.files.base import ContentFile

@shared_task
def process_photo_pipeline(photo_id):
    try:
        photo = Photo.objects.get(id=photo_id)

        # EXIF Scrubbing
        if photo.original_url:
            scrubbed_content = remove_exif(photo.original_url)
            # Update the file in place or save to a new field?
            # PRD says "purges all EXIF metadata headers ... before writing the file to physical disk space"
            # Since it's already saved, we update it.
            photo.original_url.save(photo.original_url.name, scrubbed_content, save=False)

        photo.processing_status = 'DETECTING'
        photo.save()

        # Mock detection delay
        time.sleep(1)

        num_faces = random.randint(1, 3)
        faces = []
        for _ in range(num_faces):
            # Generate mock embedding (normally ArcFace)
            mock_embedding = np.random.rand(512).tolist()
            face = Face.objects.create(
                photo=photo,
                embedding=str(mock_embedding),
                confidence_score=0.95
            )
            faces.append(face)

        photo.processing_status = 'EMBEDDING'
        photo.save()

        photo.processing_status = 'READY'
        photo.save()

        # Trigger clustering for the event after each photo
        cluster_event_faces.delay(photo.event_id)

    except Photo.DoesNotExist:
        pass

@shared_task
def cluster_event_faces(event_id):
    faces = Face.objects.filter(photo__event_id=event_id, cluster__isnull=True)
    if not faces.exists():
        return

    clusters = Cluster.objects.filter(event_id=event_id)

    for face in faces:
        if clusters.exists() and random.random() > 0.5:
            target_cluster = random.choice(clusters)
        else:
            target_cluster = Cluster.objects.create(event_id=event_id)
            clusters = Cluster.objects.filter(event_id=event_id)

        face.cluster = target_cluster
        face.save()

        target_cluster.face_count = target_cluster.faces.count()
        if not target_cluster.representative_face_id:
            target_cluster.representative_face_id = face.id
        target_cluster.save()
