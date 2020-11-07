from django.shortcuts import render
from django.http import HttpResponse
import requests

def index(req) :
    return HttpResponse('Yooo, you made it!')

def search(req,criteria) :
    criteria = criteria.replace('+',' ')
    return HttpResponse(f'{criteria}')