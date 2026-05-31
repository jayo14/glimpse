from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event, Photo
from .serializers import EventSerializer, PhotoSerializer
from media_processing.tasks import process_photo_pipeline
from drf_spectacular.utils import extend_schema, extend_schema_view
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@extend_schema_view(
    list=extend_schema(description="List all events owned by the authenticated user."),
    retrieve=extend_schema(description="Retrieve details of a specific event."),
    create=extend_schema(description="Create a new event."),
    update=extend_schema(description="Update an existing event."),
    partial_update=extend_schema(description="Partially update an existing event."),
    destroy=extend_schema(description="Delete an event."),
)
class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing events.
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        if self.action == 'public_upload':
            return [permissions.AllowAny()]
        return super().get_permissions()

    @extend_schema(
        request={'multipart/form-data': {'type': 'object', 'properties': {'photos': {'type': 'array', 'items': {'type': 'string', 'format': 'binary'}}}}},
        responses={201: PhotoSerializer(many=True)},
        description="Upload multiple photos to a specific event (Authenticated)."
    )
    @action(detail=True, methods=['post'])
    def upload_photos(self, request, pk=None):
        event = self.get_object()
        return self._handle_upload(event, request)

    @extend_schema(
        request={'multipart/form-data': {'type': 'object', 'properties': {'photos': {'type': 'array', 'items': {'type': 'string', 'format': 'binary'}}}}},
        responses={201: PhotoSerializer(many=True)},
        description="Public endpoint for guests to upload photos to an event without authentication."
    )
    @action(detail=True, methods=['post'], url_path='upload', permission_classes=[permissions.AllowAny])
    def public_upload(self, request, pk=None):
        try:
            event = Event.objects.get(pk=pk)
            if event.status != 'ACTIVE':
                return Response({"error": "Event is not active"}, status=status.HTTP_400_BAD_REQUEST)
            return self._handle_upload(event, request)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    def _handle_upload(self, event, request):
        files = request.FILES.getlist('photos')
        if not files:
            return Response({"error": "No photos provided"}, status=status.HTTP_400_BAD_REQUEST)

        photos = []
        channel_layer = get_channel_layer()
        for file in files:
            photo = Photo.objects.create(event=event, original_url=file)
            process_photo_pipeline.delay(photo.id)
            photo_data = PhotoSerializer(photo).data
            photos.append(photo_data)

            # Broadcast to Live Wall
            async_to_sync(channel_layer.group_send)(
                f'live_wall_{event.id}',
                {
                    'type': 'photo_uploaded',
                    'photo': photo_data
                }
            )

        return Response(photos, status=status.HTTP_201_CREATED)

@extend_schema_view(
    list=extend_schema(description="List all photos for events owned by the authenticated user."),
    retrieve=extend_schema(description="Retrieve details of a specific photo."),
)
class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and deleting photos.
    """
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Photo.objects.filter(event__owner=self.request.user)

    def perform_destroy(self, instance):
        event_id = instance.event.id
        photo_id = str(instance.id)
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            f'live_wall_{event_id}',
            {
                'type': 'photo_deleted',
                'photo_id': photo_id
            }
        )
        instance.delete()
