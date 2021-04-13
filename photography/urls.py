from django.urls import path
from . import views


app_name = 'photography'
urlpatterns = [
    path('clients/<slug:slug>', views.api_client_gallery),
    path('client', views.ClientApi.as_view()),
    path('<slug:slug>', views.api_gallery),
]
