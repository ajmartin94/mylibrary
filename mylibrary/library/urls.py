from django.urls import path

from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('search/<str:criteria>',views.search),
    path('select/<str:identifier>',views.book_select),
    path('adduser/<str:email>/<str:username>/<str:password>/<str:first_name>/<str:last_name>',views.add_user),
    path('authuser/<str:username>/<str:password>',views.authuser)
]