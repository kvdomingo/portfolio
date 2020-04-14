from django.urls import path
from . import views


app_name = 'photography'
urlpatterns = [
    path('photography', views.index, name='index'),
    path('photography/clients/', views.clients, name='clients'),
    path('photography/clients/<slug:client_slug>', views.client_gallery, name='client'),
    path('photography/<slug:group>/', views.gallery, name='gallery'),
]
