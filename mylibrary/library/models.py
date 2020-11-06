from django.db import models

class User(models.Model) :
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    name = models.CharField(max_length=100)

class Library(models.Model) :
    name = models.CharField(max_length=100)
    userid = models.ForeignKey(User,on_delete=models.CASCADE)