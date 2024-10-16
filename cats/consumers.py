import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
            # Присоединяемся к группе "chat"
            await self.channel_layer.group_add("chat_group", self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        # Удаляемся из группы "chat"
        await self.channel_layer.group_discard("chat_group", self.channel_name)


    async def receive(self, text_data):
        # Получаем данные от клиента
        data = json.loads(text_data)
        user = data['user']  # Получаем пользователя из данных
        message = data['content']  # Получаем сообщение

        # Отправляем сообщение обратно в группу "chat"
        await self.channel_layer.group_send(
            "chat_group",
            {
                'type': 'chat_message',
                'message': message,
                'user': user
            }
        )

    async def chat_message(self, event):
        # Отправляем сообщение обратно клиенту
        message = event['message']
        user = event['user']

        await self.send(text_data=json.dumps({
            'user': user,
            'message': message
        }))
