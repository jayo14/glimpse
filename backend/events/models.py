from django.db import models
from django.conf import settings
import uuid

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    date = models.DateField()
    type = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    cover_photo = models.ImageField(upload_to='events/covers/', blank=True, null=True)
    status = models.CharField(max_length=20, default='ACTIVE')
    public_slug = models.SlugField(unique=True, blank=True)
    qr_code_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.public_slug:
            self.public_slug = str(self.id)[:8]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Photo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='photos')
    original_url = models.ImageField(upload_to='photos/original/')
    thumbnail_url = models.ImageField(upload_to='photos/thumbnails/', blank=True, null=True)
    compressed_url = models.ImageField(upload_to='photos/compressed/', blank=True, null=True)
    upload_status = models.CharField(max_length=20, default='PENDING')
    processing_status = models.CharField(max_length=20, default='QUEUED')
    file_hash = models.CharField(max_length=64, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo {self.id} for {self.event.name}"
