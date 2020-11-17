from django.contrib.auth.models import User
from .models import Books,Library,Ratings
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = ['url','username','email','first_name','last_name','password']

    def create(self,data) :
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            last_name=data['last_name'],
            first_name=data['first_name']
        )
        user.set_password(data['password'])
        user.save()
        return user

class RatingsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Ratings
        fields = ['id','rating','userid','bookid']

class BooksSerializer(serializers.ModelSerializer) :
    ratings = RatingsSerializer(source='ratings_set',many=True)
    class Meta :
        model = Books
        fields = ['id','title','library_id','data','ratings','average_rating']
        depth = 1
    
class LibrarySerializer(serializers.ModelSerializer) :
    books = BooksSerializer(many=True)
    class Meta :
        model = Library
        fields = ['url','id','name','books']
        depth = 1

