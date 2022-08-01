from asyncio import Task
from rest_framework import serializers
from .models import Tasks


class TaskSerializer(serializers.ModelSerializer):
    task_owner = serializers.StringRelatedField(read_only=True)
    task_assignedTo = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Tasks
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        return super(TaskSerializer, self).__init__(*args, **kwargs)

class UpdateTaskSerialier(serializers.ModelSerializer):

    class Meta:
        model = Tasks
        fields = {
            'task_title',
            'task_description',
            'task_owner',
            'task_assignedTo'
        }