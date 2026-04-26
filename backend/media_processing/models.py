from django.db import models
from events.models import Photo, Event
import uuid

class Cluster(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='clusters')
    label = models.CharField(max_length=255, blank=True)
    face_count = models.IntegerField(default=0)
    representative_face_id = models.UUIDField(blank=True, null=True)
    is_labeled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.label or f"Cluster {self.id}"

class Face(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='faces')
    crop_url = models.ImageField(upload_to='faces/crops/')
    # Using a text field to store embedding as a JSON list for MVP mock
    embedding = models.TextField(blank=True)
    bounding_box = models.JSONField(default=dict)
    confidence_score = models.FloatField(default=0.0)
    cluster = models.ForeignKey(Cluster, on_delete=models.SET_NULL, null=True, related_name='faces')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Face {self.id} in Photo {self.photo.id}"

class GuestSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    selfie_embedding = models.TextField(blank=True)
    matched_cluster_ids = models.JSONField(default=list)
    ip_hash = models.CharField(max_length=64, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
