from django.urls import path
from . import views


app_name = 'photography'
urlpatterns = [
    path('photography', views.index, name='index'),
]
