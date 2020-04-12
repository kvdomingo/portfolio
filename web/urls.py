from django.urls import path
from django.views.generic.base import TemplateView
from . import views


app_name = 'web'
urlpatterns = [
    path('', views.index, name='index'),
    path('robots.txt', TemplateView.as_view(template_name='web/robots.txt', content_type='text/plain')),
    path('cv', views.cv, name='cv'),
]
