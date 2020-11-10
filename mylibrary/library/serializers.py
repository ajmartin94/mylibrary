from django.contrib.auth.models import User
from .models import Books,Library
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer) :
    class Meta :
        model = User
        fields = ['url','username','email','first_name','last_name']

class BooksSerializer(serializers.HyperlinkedModelSerializer) :
    class Meta :
        model = Books
        fields = ['url','title','library_id','data']
    
class LibrarySerializer(serializers.HyperlinkedModelSerializer) :
    class Meta :
        model = Library
        fields = ['url','name','userid','books']