from django.urls import path

from .views import ClientView, api_client_gallery, api_gallery

app_name = "photography"

urlpatterns = [
    path("clients/<slug:slug>", api_client_gallery),
    path("client", ClientView.as_view()),
    path("<slug:slug>", api_gallery),
]
