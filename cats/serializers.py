from rest_framework import serializers
from .models import Cat, Message


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = ['id', 'name', 'breed', 'age', 'is_furry', 'owner']
        read_only_fields = ['owner']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp']  # Включаем timestamp
        read_only_fields = ['sender', 'timestamp']  # Указываем, что sender и 
