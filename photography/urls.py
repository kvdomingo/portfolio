from django.urls import path
from . import views


app_name = 'photography'
urlpatterns = [
    path('photography', views.index, name='index'),
    path('photography/clients/', views.clients, name='clients'),
    path('photography/<str:group>/', views.gallery, name='gallery'),
]
