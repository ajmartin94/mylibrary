from django.urls import path

from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('search/<str:criteria>',views.search),
    path('select/<str:identifier>',views.book_select)
]