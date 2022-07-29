from tkinter.tix import Tree
from django.db import models
from django.conf import settings
from PIL import Image

# Create your models here.

User = settings.AUTH_USER_MODEL

class Tasks(models.Model):
    task_title = models.CharField(max_length=255)
    task_description = models.TextField(default="Put Task Description")
    task_owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="task_owner")
    task_assignedTo = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="task_to_user")
    added = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now=True)
    isCompleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-added']

    def __str__(self):
        return self.title