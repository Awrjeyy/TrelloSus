from tkinter.tix import Tree
from django.db import models
from django.conf import settings
from PIL import Image

# Create your models here.

User = settings.AUTH_USER_MODEL



class Tasks(models.Model):
    task_title = models.CharField(max_length=255)
    task_group = models.CharField(max_length=255, default='')
    task_description = models.TextField(default="Put Task Description")
    task_owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="task_owner")
    task_assignedTo = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="task_to_user")
    added = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now=True)
    isCompleted = models.BooleanField(default=False)
    task_img = models.ImageField(blank=True, null=True, default='default-book-cover.png',
        upload_to='tasks-pics',
    )

    class Meta:
        ordering = ['-added']

    def __str__(self):
        return self.task_title

    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.task_img.path)

        if img.height > 500 or img.width > 500:
            new_img = (300,300)
            img.thumbnail(new_img)
            img.save(self.task_img.path)

class Board(models.Model):
    board_title = models.CharField(max_length=255)
    board_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='board_admin')
    board_members = models.ManyToManyField(User, related_name='board_member')
    board_tasks = models.ManyToManyField(Tasks, blank=True, related_name='board_tasks')