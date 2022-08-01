from django.contrib import admin
from .models import Tasks, Board
# Register your models here.


class TasksAdmin(admin.ModelAdmin):
    list_display = (
        'task_title',
        'task_group',
        'task_owner',
        'task_description',
        'added'
        
    )
    search_fields = [
        'task_title',
        'task_owner',
        'task_description'
    ]

admin.site.register(Tasks, TasksAdmin)
admin.site.register(Board)