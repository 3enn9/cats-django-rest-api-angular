from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class UserByToken(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = {
            "id": str(request.user.id),
            "username": str(request.user.username)
        }
        return Response(data, status=status.HTTP_201_CREATED)