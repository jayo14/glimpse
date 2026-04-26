from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event, Photo
from .serializers import EventSerializer, PhotoSerializer
from media_processing.tasks import process_photo_pipeline

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def upload_photos(self, request, pk=None):
        event = self.get_object()
        files = request.FILES.getlist('photos')

        photos = []
        for file in files:
            photo = Photo.objects.create(event=event, original_url=file)
            process_photo_pipeline.delay(photo.id)
            photos.append(PhotoSerializer(photo).data)

        return Response(photos, status=status.HTTP_201_CREATED)

class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Photo.objects.filter(event__owner=self.request.user)
