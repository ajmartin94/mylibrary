from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from library.models import Books, Library
import requests
from django.contrib.auth.models import User
import django.middleware.csrf
import json
from django.contrib.auth import authenticate,login
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer,BooksSerializer,LibrarySerializer
import sys

print('i am alive')
class UserViewSet(viewsets.ModelViewSet) :
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self) :
        if self.request.method == 'POST' :
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
            existing = Books.objects.get(library_id=identifier)
        except: 
            key = data['key']
            resp = requests.get(f'https://openlibrary.org/works/{key}.json')
            book = resp.json()

            book = Books.objects.create(
                title=book['title'],
                library_id=data['key'],
                data=book
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

    def list(self,request) :
        print('made it to list printing')
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

# def check_token(req) :
#     return HttpResponse(status=204)

# def index(req) :
#     return HttpResponse('Yooo, you made it!')

# def search(req,criteria) :
#     resp = requests.get(f'http://openlibrary.org/search.json?title={criteria}')
#     return JsonResponse(resp.json())

# def book_select(req) :
#     body = json.loads(req.body.decode('utf-8'))
#     identifier = body['key']
#     library = Library.objects.get(pk=body['libraryid'])
#     try:
#         existing = Books.objects.get(library_id=identifier)
#     except: 
#         resp = requests.get(f'https://openlibrary.org/works/{identifier}.json')
#         book = resp.json()
#         new_book = Books(
#             title=book['title'],
#             library_id=identifier,
#             data=book
#         )
#         new_book.save()
        
#         library.books.add(new_book)
#         return HttpResponse(status=204)
#     else:
#         library.books.add(existing)
#         return HttpResponse(status=204)

# def add_user(req) :
#     body = json.loads(req.body.decode('utf-8'))
#     user = User.objects.create_user(body['username'],body['email'],body['password'])
#     user.first_name = body['first_name']
#     user.last_name = body['last_name']
#     user.save()

#     login(req,user)
#     return JsonResponse({
#         'username': user.get_username(),
#         'name': user.get_full_name()
#     })

# def authenticate_user(req) :
#     body = json.loads(req.body.decode('utf-8'))
#     user = authenticate(req,username=body['username'],password=body['password'])
#     if user is not None :
#         login(req,user)
#         return JsonResponse({
#             'username': user.get_username(),
#             'name': user.get_full_name()
#         })
#     else :
#         return HttpResponseBadRequest('Invalid login')


# def send_token(req) :
#     return HttpResponse(django.middleware.csrf.get_token(req))

# def get_library_data(req) :
#     body = json.loads(req.body.decode('utf-8'))
#     user = User.objects.get(username=body['username'])
#     # try:
#     data = Library.objects.filter(userid=user)
#     for i in data :
#         i.books.all()
#     # except: 
#     #     data = Library.objects.filter(userid=user).values()
#     return JsonResponse({'libraries':list(data)})

# def add_library(req) :
#     body = json.loads(req.body.decode('utf-8'))
#     user = User.objects.get(username=body['username'])
#     library = Library.objects.create(name=body['name'],userid=user)
#     return HttpResponse(status=204)