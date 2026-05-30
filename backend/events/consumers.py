import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LiveWallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.event_id = self.scope['url_route']['kwargs']['event_id']
        self.room_group_name = f'live_wall_{self.event_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from room group
    async def photo_uploaded(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))

    async def photo_deleted(self, event):
        await self.send(text_data=json.dumps(event))
