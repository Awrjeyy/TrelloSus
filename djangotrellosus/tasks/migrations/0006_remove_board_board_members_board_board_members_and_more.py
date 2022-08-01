# Generated by Django 4.2.dev20220526083951 on 2022-08-01 17:12

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0005_board'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='board_members',
        ),
        migrations.AddField(
            model_name='board',
            name='board_members',
            field=models.ManyToManyField(related_name='board_member', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='board',
            name='board_tasks',
        ),
        migrations.AddField(
            model_name='board',
            name='board_tasks',
            field=models.ManyToManyField(related_name='board_tasks', to='tasks.tasks'),
        ),
    ]
