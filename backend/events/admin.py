from django.contrib import admin
from .models import Event, Photo

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'date', 'type', 'status', 'created_at')
    list_filter = ('status', 'type', 'date')
    search_fields = ('name', 'owner__username', 'public_slug')
    readonly_fields = ('id', 'public_slug', 'created_at')

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'upload_status', 'processing_status', 'created_at')
    list_filter = ('upload_status', 'processing_status', 'event')
    readonly_fields = ('id', 'created_at')
