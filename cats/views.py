from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny

from .models import Cat
from .forms import CatForm
from .serializers import CatSerializer, MessageSerializer

from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cat, Message
from .serializers import CatSerializer

class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Привязываем кота к текущему пользователю
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        # Ограничиваем список котов только для текущего пользователя
        return Cat.objects.filter(owner=self.request.user)


class MessageListView(APIView):
    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)