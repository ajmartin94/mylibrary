from django.shortcuts import render
from django.http import HttpResponse
from library.models import Books
import requests

def index(req) :
    return HttpResponse('Yooo, you made it!')

def search(req,criteria) :
    resp = requests.get(f'http://openlibrary.org/search.json?title={criteria}')
    search_results = resp.json()['docs'][:10]
    return HttpResponse(f'{resp.json()}')

def book_select(req,identifier) :
    resp = requests.get(f'https://openlibrary.org/works/{identifier}.json')
    book = resp.json()
    new_book = Books(
        title=book['title'],
        authors=book['authors'],
        library_id=book['key'],
        cover_art=book['covers']
    )
    new_book.save()
    return HttpResponse('yo')