from django.urls import path
from django.conf import settings
from django.views.generic.base import TemplateView
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from . import views
from svip.models import BlogPost, Course
from photography.models import Client
from .sitemap import StaticViewSitemap


sitemaps = {
    'static': StaticViewSitemap,
    'photography': GenericSitemap(
        {
            'queryset': Client.objects.all(),
        },
        priority=0.5,
    ),
    'courses': GenericSitemap(
        {
            'queryset': Course.objects.all(),
        },
        priority=0.5,
    ),
    'blog': GenericSitemap(
        {
            'queryset': BlogPost.objects.all(),
            'date_field': 'created',
        },
        priority=0.6,
    ),
}

app_name = 'web'
urlpatterns = [
    # path('', views.index, name='index'),
    # path('cv', views.cv, name='cv'),
    path('robots.txt', TemplateView.as_view(template_name='web/robots.txt', content_type='text/plain')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
