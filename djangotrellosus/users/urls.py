from django.urls import path
from . import views, api
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'users'
urlpatterns = [
    path('api/users/', api.UserViewset.as_view({'get': 'get_users'}) ),
    path('api/register/', api.UserViewset.as_view({'post': 'create_user'}) ),
    path('api/user-update/<int:id>/', api.UpdateUserViewset.as_view({'post': 'updateuser'}) ),
    path('api/user/<int:id>/', api.UserViewset.as_view({'get': 'get_detail_user'}) ),
    path('api/user-delete/<int:id>/', api.UserViewset.as_view({'delete': 'delete_user'}) ),
    path('api/change-password/<int:id>/', api.ChangePassViewset.as_view({'post': 'changepassword'}) ),
    path('api/login/', api.UserViewset.as_view({'post': 'userlogin'}) ),
    path('api/logout/', api.UserViewset.as_view({'get': 'userlogout'})),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)