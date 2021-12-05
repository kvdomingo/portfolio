from django.contrib import admin
from django.conf import settings
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from revproxy.views import ProxyView
from svip.models import BlogPost, Course
from photography.models import Client
from web.sitemap import StaticViewSitemap
from . import views

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
    path('api/auth/', include('rest_framework.urls')),
    path('tinymce/', include('tinymce.urls')),
    path('api/photography/', include('photography.urls')),
    path('api/svip/', include('svip.urls')),
    path('api/dev/', include('dev.urls')),
    path('api/', include('web.urls')),
]

if settings.PYTHON_ENV == 'development':
    urlpatterns.append(re_path(r'^(?P<path>.*)$', ProxyView.as_view(upstream='http://frontend:3000')))
else:
    urlpatterns.append(re_path(r'^.*/?$', views.index))
