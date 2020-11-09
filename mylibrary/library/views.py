from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from library.models import Books
import requests
from django.contrib.auth.models import User
import django.middleware.csrf
import json

def index(req) :
    return HttpResponse('Yooo, you made it!')

def search(req,criteria) :
    resp = requests.get(f'http://openlibrary.org/search.json?title={criteria}')
    return JsonResponse(resp.json())

def book_select(req,identifier) :
    try:
        existing = Books.objects.get(library_id=identifier)
    except: 
        resp = requests.get(f'https://openlibrary.org/works/{identifier}.json')
        book = resp.json()
        new_book = Books(
            title=book['title'],
            library_id=identifier,
            data=book
        )
        new_book.save()
        return JsonResponse(book)
    else:
        return JsonResponse(existing.data)

def add_user(req) :
    body = json.loads(req.body.decode('utf-8'))
    print(body)
    user = User.objects.create_user(body['username'],body['email'],body['password'])
    user.first_name = body['first_name']
    user.last_name = body['last_name']
    user.save()
    return HttpResponse(status=204)

# def authenticate_user(req,username,password) :

def send_token(req) :
    return HttpResponse(django.middleware.csrf.get_token(req))