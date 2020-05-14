from datetime import datetime
from cloudinary import CloudinaryImage
from cloudinary.api import resources
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from . import functions
from .models import *
from .serializers import *
from rest_framework import generics


# def index(request):
#     images = functions.get_resources(f'{settings.ASSET_DIR}/latest')
#     context = {
#         'active_page': 'Photography',
#         'images': images,
#     }
#     return render(request, 'photography/index.html.j2', context)
#
#
# def gallery(request, group):
#     images = functions.get_resources(f'{settings.ASSET_DIR}/{group}')
#     context = {
#         'active_page': group.split('-')[0].capitalize() if ('clients' in group) else group.capitalize(),
#         'group': group,
#         'images': images,
#     }
#     return render(request, 'photography/index.html.j2', context)
#
#
# def clients(request):
#     client_list = Client.objects.order_by('-shoot_date')
#     images = functions.get_resources(f'{settings.ASSET_DIR}/clients-landing', order='name')
#     context = {
#         'active_page': 'Clients',
#         'client_list': client_list,
#         'images': images,
#     }
#     return render(request, 'photography/clients.html.j2', context)
#
#
# def client_gallery(request, client_slug):
#     client = Client.objects.get(slug=client_slug)
#     images = functions.get_resources(f'{settings.ASSET_DIR}/clients/{client_slug}')
#     context = {
#         'active_page': client.name,
#         'client': client,
#         'group': client_slug,
#         'images': images,
#     }
#     return render(request, 'photography/client-index.html.j2', context)



class ClientApi(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filterset_fields = ['slug']


def api_gallery(request, slug):
    images, full = zip(*functions.get_resources(f'{settings.ASSET_DIR}/{slug}'))
    return JsonResponse(dict(
        full=full,
        images=images,
    ))


def api_client_gallery(request, slug):
    images, full = zip(*functions.get_resources(f'{settings.ASSET_DIR}/clients/{slug}'))
    return JsonResponse(dict(
        full=full,
        images=images,
    ))
