from django.shortcuts import render
from django.http import HttpResponse
import requests

def index(req) :
    return HttpResponse('Yooo, you made it!')

def search(req,criteria) :
    resp = requests.get(f'http://openlibrary.org/search.json?title={criteria}')
    return HttpResponse(f'<p>{resp.json()}</p>')