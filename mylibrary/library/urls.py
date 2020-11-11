from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

router = routers.DefaultRouter()
router.register(r'users',views.UserViewSet)
router.register(r'books',views.BooksViewSet)
router.register(r'library',views.LibraryViewSet)

urlpatterns = [
    # path('',views.index,name='index'),
    # path('search/<str:criteria>',views.search),
    # path('select',views.book_select),
    # path('gettoken',views.send_token),
    # path('adduser',views.add_user),
    # path('authuser',views.authenticate_user),
    # path('data',views.get_library_data),
    # path('addlibrary',views.add_library)
    path('',include(router.urls)),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh',TokenRefreshView.as_view(),name='token_refresh'),
    path('tokencheck/',views.check_token),
    path('users/register',views.add_user)
    # path('api-auth/',include('rest_framework.urls', namespace='rest_framework'))
]