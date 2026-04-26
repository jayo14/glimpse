from rest_framework import serializers
from .models import Event, Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    photos_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ('owner', 'public_slug', 'qr_code_url')
