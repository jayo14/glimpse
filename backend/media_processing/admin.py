from django.contrib import admin
from .models import Cluster, Face, GuestSession

@admin.register(Cluster)
class ClusterAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'label', 'face_count', 'is_labeled', 'created_at')
    list_filter = ('is_labeled', 'event')
    search_fields = ('label',)
    readonly_fields = ('id', 'created_at')

@admin.register(Face)
class FaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'photo', 'cluster', 'confidence_score', 'created_at')
    list_filter = ('cluster', 'photo__event')
    readonly_fields = ('id', 'created_at')

@admin.register(GuestSession)
class GuestSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'ip_hash', 'created_at')
    list_filter = ('event',)
    readonly_fields = ('id', 'created_at')
