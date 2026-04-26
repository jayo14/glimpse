from django.test import TestCase
from users.models import User
from events.models import Event, Photo
from media_processing.models import Cluster, Face
from rest_framework.test import APIClient
import uuid

class EventFlowTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='photographer', password='password', role='PHOTOGRAPHER')
        self.client.force_authenticate(user=self.user)

    def test_create_event_and_upload_mock(self):
        # 1. Create Event
        response = self.client.post('/api/events/', {
            'name': 'Test Wedding',
            'date': '2026-05-20',
            'type': 'Wedding'
        })
        self.assertEqual(response.status_code, 201)
        event_id = response.data['id']

        # 2. Mock Photo Upload & Pipeline (Directly calling task for test)
        from media_processing.tasks import process_photo_pipeline, cluster_event_faces

        photo = Photo.objects.create(event_id=event_id)
        process_photo_pipeline(photo.id) # Call synchronously for test

        photo.refresh_from_db()
        self.assertEqual(photo.processing_status, 'READY')
        self.assertTrue(Face.objects.filter(photo=photo).exists())

        # 3. Check Clusters
        cluster_event_faces(event_id)
        self.assertTrue(Cluster.objects.filter(event_id=event_id).exists())

        # 4. Verify API retrieval
        response = self.client.get(f'/api/events/{event_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test Wedding')
