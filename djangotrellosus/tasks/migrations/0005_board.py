# Generated by Django 4.2.dev20220526083951 on 2022-08-01 17:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0004_tasks_task_group'),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('board_title', models.CharField(max_length=255)),
                ('board_admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board_admin', to=settings.AUTH_USER_MODEL)),
                ('board_members', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board_member', to=settings.AUTH_USER_MODEL)),
                ('board_tasks', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board_tasks', to='tasks.tasks')),
            ],
        ),
    ]