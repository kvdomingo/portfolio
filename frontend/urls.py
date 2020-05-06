from django.urls import path
from . import views


app_name = 'frontend'
urlpatterns = [
    path('beta', views.index, name='index'),
]
