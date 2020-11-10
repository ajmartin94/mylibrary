from django.urls import path

from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('search/<str:criteria>',views.search),
    path('select',views.book_select),
    path('gettoken',views.send_token),
    path('adduser',views.add_user),
    path('authuser',views.authenticate_user),
    path('data',views.get_library_data),
    path('addlibrary',views.add_library)
]