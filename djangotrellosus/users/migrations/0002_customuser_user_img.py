# Generated by Django 4.2.dev20220526083951 on 2022-07-28 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='user_img',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='profile-pics'),
        ),
    ]
