from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .functions import get_resources
from .models import Client
from .serializers import ClientSerializer


class ClientView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filterset_fields = ["slug"]


@api_view()
def api_gallery(request, slug: str):
    images = get_resources(f"{settings.ASSET_DIR}/{slug}")
    return Response(images)


@api_view()
def api_client_gallery(request, slug: str):
    images = get_resources(f"{settings.ASSET_DIR}/clients/{slug}")
    return Response(images)
