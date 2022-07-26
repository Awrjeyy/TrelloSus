from os import stat
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import CustomUser
from users.serializers import UserSerializer, RegisterSerializer

class UsersViewset(viewsets.ViewSet):
    def get_users_list(self, request, *args, **kwargs):
        users = CustomUser.objects.all()

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_users_detail(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create_user(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)