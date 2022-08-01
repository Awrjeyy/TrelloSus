from django.urls import path
from . import api

app_name = 'tasks'
urlpatterns = [
    path('api/tasks', api.TaskViewsets.as_view({'get': 'get_task_list'})),
    path('api/create-task', api.TaskViewsets.as_view({'post': 'create_task'})),
    path('api/tasks-details/<int:id>', api.TaskViewsets.as_view({'get': 'get_task_details'})),
    path('api/tasks-update/<int:id>', api.TaskViewsets.as_view({'put': 'put_task_details'}))
]
