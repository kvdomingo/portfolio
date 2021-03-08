"""kvdomingo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import TemplateView
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from svip.models import BlogPost, Course
from photography.models import Client
from web.sitemap import StaticViewSitemap


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


urlpatterns = [
    path('admin/', admin.site.urls),
	path('robots.txt', TemplateView.as_view(template_name='web/robots.txt', content_type='text/plain')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('api-auth/', include('rest_framework.urls')),
    path('tinymce/', include('tinymce.urls')),
    path('photography/', include('photography.urls')),
    path('svip/', include('svip.urls')),
    path('dev/', include('dev.urls')),
    path('', include('web.urls')),
]
