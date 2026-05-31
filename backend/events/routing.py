from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/live-wall/(?P<event_id>[^/]+)/$', consumers.LiveWallConsumer.as_asgi()),
]
