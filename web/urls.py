from django.urls import path
from django.conf import settings
from django.views.generic.base import TemplateView
from . import views


app_name = 'web'
urlpatterns = [
    path('', views.index, name='index'),
    path('cv', views.cv, name='cv'),
]

if not (settings.DEBUG and settings.ON_HEROKU):
    urlpatterns += [
        path('robots.txt', TemplateView.as_view(template_name='web/robots.txt', content_type='text/plain')),
    ]
