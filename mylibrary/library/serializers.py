from django.contrib.auth.models import User
from .models import Books,Library
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer) :
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

class BooksSerializer(serializers.HyperlinkedModelSerializer) :
    class Meta :
        model = Books
        fields = ['url','title','library_id','data']
    
class LibrarySerializer(serializers.HyperlinkedModelSerializer) :
    class Meta :
        model = Library
        fields = ['url','name','userid','books']