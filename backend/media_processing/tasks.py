import time
import random
import numpy as np
from celery import shared_task
from .models import Face, Cluster
from events.models import Photo

@shared_task
def process_photo_pipeline(photo_id):
    try:
        photo = Photo.objects.get(id=photo_id)
        photo.processing_status = 'DETECTING'
        photo.save()

        # Mock detection delay
        time.sleep(2)

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
        time.sleep(1)

        photo.processing_status = 'READY'
        photo.save()

        # Trigger clustering for the event after each photo or in batches
        cluster_event_faces.delay(photo.event_id)

    except Photo.DoesNotExist:
        pass

@shared_task
def cluster_event_faces(event_id):
    # Mock clustering (DBSCAN)
    # In a real app, we'd fetch all embeddings and run DBSCAN
    faces = Face.objects.filter(photo__event_id=event_id, cluster__isnull=True)
    if not faces.exists():
        return

    # For MVP mock: assign to a new or random existing cluster
    clusters = Cluster.objects.filter(event_id=event_id)

    for face in faces:
        if clusters.exists() and random.random() > 0.5:
            target_cluster = random.choice(clusters)
        else:
            target_cluster = Cluster.objects.create(event_id=event_id)
            clusters = Cluster.objects.filter(event_id=event_id) # Refresh

        face.cluster = target_cluster
        face.save()

        target_cluster.face_count = target_cluster.faces.count()
        if not target_cluster.representative_face_id:
            target_cluster.representative_face_id = face.id
        target_cluster.save()
