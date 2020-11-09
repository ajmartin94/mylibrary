from django.db import models
from django.contrib.auth.models import User

class Library(models.Model) :
    name = models.CharField(max_length=100)
    userid = models.ForeignKey(User,on_delete=models.CASCADE)

class Books(models.Model) :
    title=models.CharField(max_length=100)
    library_id=models.CharField(max_length=100)
    libraries=models.ManyToManyField(Library)
    data=models.JSONField()