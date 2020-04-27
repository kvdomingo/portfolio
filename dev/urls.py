from django.urls import path
from . import views


app_name = 'dev'
urlpatterns = [
    path('dev', views.index, name='index'),
    path('dev/<slug:slug>', views.project, name='project'),
]
