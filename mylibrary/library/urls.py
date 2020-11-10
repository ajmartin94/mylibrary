from django.urls import path

from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('search/<str:criteria>',views.search),
    path('select/<str:identifier>',views.book_select),
    path('gettoken',views.send_token),
    path('adduser',views.add_user),
    path('authuser',views.authenticate_user)
]