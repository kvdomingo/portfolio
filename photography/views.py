from datetime import datetime
from cloudinary import CloudinaryImage
from cloudinary.api import resources
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from . import functions


def index(request):
    images = functions.get_resources(f'{settings.ASSET_DIR}/latest')
    context = {
        'active_page': 'Photography',
        'images': images,
    }
    return render(request, 'photography/index.html.j2', context)


def gallery(request, group):
    images = functions.get_resources(f'{settings.ASSET_DIR}/{group}')
    context = {
        'active_page': group.split('-')[0].capitalize() if ('clients' in group) else group.capitalize(),
        'images': images,
    }
    return render(request, 'photography/index.html.j2', context)


def clients(request):
    images = functions.get_resources(f'{settings.ASSET_DIR}/clients-landing', order='name')
    context = {
        'active_page': 'Clients',
        'images': images,
    }
    return render(request, 'photography/clients.html.j2', context)
