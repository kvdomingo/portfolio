from django.urls import path
from . import views


app_name = 'dev'
urlpatterns = [
    path('project', views.ProjectApi.as_view()),
]
