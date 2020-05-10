from django.urls import path, re_path
from . import views


app_name = 'photography'
urlpatterns = [
    re_path(r'^api/photography/client', views.ClientApi.as_view()),
    path('api/photography/<slug:slug>', views.api_gallery),
    path('photography', views.index, name='index'),
    path('photography/clients/', views.clients, name='clients'),
    path('photography/clients/<slug:client_slug>', views.client_gallery, name='client'),
    path('photography/<slug:group>/', views.gallery, name='gallery'),
]
