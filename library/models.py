from django.db import models
from django.contrib.auth.models import User

class Books(models.Model) :
    title=models.CharField(max_length=100)
    library_id=models.CharField(max_length=100)
    data=models.JSONField()
    average_rating = models.DecimalField(max_digits=5,decimal_places=2)
    rating=models.ManyToManyField(
        User,
        through='Ratings'
    )

class Library(models.Model) :
    name = models.CharField(max_length=100)
    userid = models.ForeignKey(User,on_delete=models.CASCADE)
    books = models.ManyToManyField(Books)

class Ratings(models.Model) :
    rating = models.IntegerField()
    userid = models.ForeignKey(User,on_delete=models.CASCADE)
    bookid = models.ForeignKey(Books,on_delete=models.CASCADE)
    
    class Meta :
        unique_together = (('userid','bookid'))