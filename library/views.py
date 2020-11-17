from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.db.models import Avg
from library.models import Books, Library, Ratings
import requests
from django.contrib.auth.models import User
import django.middleware.csrf
import json
from django.contrib.auth import authenticate,login
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer,BooksSerializer,LibrarySerializer
import sys

class UserViewSet(viewsets.ModelViewSet) :
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self) :
        if self.request.method == 'POST' or self.request.method == 'GET':
            self.permission_classes = (permissions.AllowAny,)
        
        return super(UserViewSet,self).get_permissions()

class BooksViewSet(viewsets.ModelViewSet) :
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self,request) :
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        library = Library.objects.get(pk=data['libraryid'])
        try:
            existing = Books.objects.get(library_id=data['key'])
        except: 
            key = data['key']
            resp = requests.get(f'https://openlibrary.org/works/{key}.json')
            book = resp.json()

            book = Books.objects.create(
                title=book['title'],
                library_id=data['key'],
                data=book,
                average_rating=0.00
            )
            book.save()
            
            library.books.add(book)
        else:
            library.books.add(existing)
        return HttpResponse(status=204)

    def destroy(self,request,pk=None) :
        library = Library.objects.get(pk=request.query_params['libraryId'])
        book = Books.objects.get(pk=pk)
        library.books.remove(book)
        return HttpResponse(status=200)
        

class LibraryViewSet(viewsets.ModelViewSet) :
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self) :
        if self.request.method == 'GET' and 'username' in self.request.query_params.keys() :
            self.permission_classes = (permissions.AllowAny,)
        return super(LibraryViewSet,self).get_permissions()

    def list(self,request) :
        if 'username' in self.request.query_params.keys() :
            user = User.objects.get(username=request.query_params['username'])
        else :
            user = User.objects.get(username=request.user.username)
        queryset = Library.objects.filter(userid=user)
        serializer = LibrarySerializer(queryset,many=True,context={'request': request})
        return Response(serializer.data)

    def create(self,request) :
        try:
            user = User.objects.get(username=request.user.username)
            print(request.body)
            data = json.loads(request.body.decode('utf-8'))
            library = Library.objects.create(
                name=data['name'],
                userid=user
            )
            library.save()
        except:
            e = sys.exc_info()[0]
            return HttpResponse(e)

        return HttpResponse(status=204)

class RatingsViewSet(viewsets.ModelViewSet) :
    queryset = Ratings.objects.all()
    serializer_class = LibrarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self,request) :
        data = json.loads(request.body.decode('utf-8'))
        user = User.objects.get(username=request.user.username)
        book = Books.objects.get(pk=data['bookId'])

        Ratings.objects.create(rating=data['rating'],userid=user,bookid=book)

        return HttpResponse(status=200)

    def partial_update(self,request,pk=None) :
        data = json.loads(request.body.decode('utf-8'))
        rating = Ratings.objects.get(pk=pk)
        rating.rating = data['rating']
        rating.save()

        return HttpResponse(status=200)