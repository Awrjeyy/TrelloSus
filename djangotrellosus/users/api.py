from os import stat
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
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

    def login_user(self, request, format=None):
        # import pdb; pdb.set_trace();
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