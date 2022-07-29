from os import stat
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth import authenticate, login, logout

from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from users.serializers import UserSerializer, RegisterSerializer, UpdateUserSerializer

class UsersViewset(viewsets.ViewSet):
    
    parser_classes = [JSONParser, MultiPartParser,FormParser]
    def get_users_list(self, request, *args, **kwargs):
        users = CustomUser.objects.all()

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_users_detail(self, request, id, format=None):
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create_user(self, request, *args, **kwargs):
        import pdb; pdb.set_trace();
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put_users_detail(self, request, id, format=None):
        import pdb; pdb.set_trace();
        parser_classes = [MultiPartParser, FormParser]
        permission_classes = [IsAuthenticated]
        
        user = CustomUser.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def login_user(self, request, format=None):
        
        data = request.data

        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(username=email, password=password)

        if user is not None:
            token = user.auth_token.key
            login(request, user)
            loggedin_user = CustomUser.objects.get(email=email)
            serializer = UserSerializer(loggedin_user)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
            

        else:

            return Response({{'error': 'Incorrect email or password'}})

    def logout_user(self, request, *args, **kwargs):
        request.user.auth_token.delete
        logout(request)
        return Response("Logged Out Successfully")