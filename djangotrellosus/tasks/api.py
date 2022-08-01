from os import stat
from django.urls import is_valid_path
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth import authenticate, login, logout

from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer
from .models import Tasks

class TaskViewsets(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_task_list(self, request, *args, **kwargs):
        tasks = Tasks.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_task(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_task_details(self, request, id, format=None):
        tasks = Tasks.objects.get(id=id)
        serializer = TaskSerializer(tasks)
        return Response(serializer.data)

    def put_task_details(self, request, id, format=None):
        import pdb; pdb.set_trace();
        task = Tasks.objects.get(id=id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)