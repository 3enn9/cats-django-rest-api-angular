from rest_framework import serializers
from .models import Cat, Message
from django.contrib.auth.models import User


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = ['id', 'name', 'breed', 'age', 'is_furry', 'owner']
        read_only_fields = ['owner']

from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'timestamp']  # Укажите поля, которые вы хотите сериализовать

    def to_representation(self, instance):
        """Переопределите метод для кастомизации вывода"""
        representation = super().to_representation(instance)
        representation['user'] = instance.user.username  # Получаем имя пользователя
        return representation
