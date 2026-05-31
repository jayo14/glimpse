from django.test import TestCase
from users.models import User
from events.models import Event, Photo
from media_processing.models import Cluster, Face
from rest_framework.test import APIClient
import uuid
import io
from PIL import Image

class EventFlowTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='photographer', password='password', role='PHOTOGRAPHER')
        self.client.force_authenticate(user=self.user)

    def test_create_event_and_upload_mock(self):
        # 1. Create Event
        response = self.client.post('/api/v1/events/', {
            'name': 'Test Wedding',
            'date': '2026-05-20',
            'type': 'Wedding'
        })
        self.assertEqual(response.status_code, 201)
        event_id = response.data['id']

        # 2. Mock Photo Upload & Pipeline (Directly calling task for test)
        from media_processing.tasks import process_photo_pipeline, cluster_event_faces

        # Create a real image for EXIF scrubbing test
        file_io = io.BytesIO()
        image = Image.new('RGB', (100, 100))
        image.save(file_io, 'JPEG')
        file_io.name = 'test.jpg'
        file_io.seek(0)

        photo = Photo.objects.create(event_id=event_id, original_url=ContentFile(file_io.read(), 'test.jpg'))
        process_photo_pipeline(photo.id) # Call synchronously for test

        photo.refresh_from_db()
        self.assertEqual(photo.processing_status, 'READY')
        self.assertTrue(Face.objects.filter(photo=photo).exists())

        # 3. Check Clusters
        cluster_event_faces(event_id)
        self.assertTrue(Cluster.objects.filter(event_id=event_id).exists())

        # 4. Verify API retrieval
        response = self.client.get(f'/api/v1/events/{event_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test Wedding')

    def test_public_upload(self):
        # 1. Create Event
        event = Event.objects.create(owner=self.user, name='Public Event', date='2026-05-20', type='Party', status='ACTIVE')

        # 2. Public Upload (No Auth)
        client = APIClient() # Unauthenticated
        file_io = io.BytesIO()
        image = Image.new('RGB', (100, 100))
        image.save(file_io, 'JPEG')
        file_io.name = 'guest.jpg'
        file_io.seek(0)

        response = client.post(f'/api/v1/events/{event.id}/upload/', {'photos': [file_io]}, format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Photo.objects.filter(event=event).count(), 1)

from django.core.files.base import ContentFile
