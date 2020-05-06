from django.urls import path, re_path
from . import views


app_name = 'dev'
urlpatterns = [
    re_path('^api/dev/project', views.ProjectApi.as_view()),
    path('dev', views.index, name='index'),
    path('dev/<slug:slug>', views.project, name='project'),
]
