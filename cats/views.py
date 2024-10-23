from rest_framework import viewsets, permissions, generics
from .models import Cat, Message
from .serializers import CatSerializer, MessageSerializer

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
    
class MessageListCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)