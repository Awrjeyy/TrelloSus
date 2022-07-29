from os import stat
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth import authenticate, login, logout

from rest_framework.permissions import IsAuthenticated

class TaskViewsets(viewsets.ViewSet):
    def get_task_list(self, request, *args, **kwargs):
        return 