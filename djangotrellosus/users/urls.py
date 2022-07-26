from django.urls import path
from . import views, api
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'users'
urlpatterns = [
    path('api/users', api.UsersViewset.as_view({'get': 'get_users_list'})),
    path('api/user/<int:id>', api.UsersViewset.as_view({'get': 'get_users_detail'})),
    path('api/register', api.UsersViewset.as_view({'post': 'create_user'})),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)