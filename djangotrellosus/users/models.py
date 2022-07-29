from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from PIL import Image
# Create your models here.

from .managers import CustomUserManager

User = settings.AUTH_USER_MODEL

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    bio = models.TextField(default="Your Bio")
    objects = CustomUserManager()
    user_img = models.ImageField(blank=True, null=True, default='default.jpg',
        upload_to='profile-pics',
    )
    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.user_img.path)

        if img.height > 500 or img.width > 500:
            new_img = (300,300)
            img.thumbnail(new_img)
            img.save(self.user_img.path)


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        token = Token.objects.create(user=instance)