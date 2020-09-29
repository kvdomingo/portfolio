from django.urls import path
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
    path('api/home/technology', views.TechnologyApi.as_view()),
    path('api/cv/education', views.EducationApi.as_view()),
    path('api/cv/work', views.WorkApi.as_view()),
    path('api/cv/project', views.ProjectApi.as_view()),
    path('api/cv/certification', views.CertificationApi.as_view()),
    path('api/cv/publication', views.PublicationApi.as_view()),
    path('api/cv/reference', views.ReferenceApi.as_view()),
    path('robots.txt', TemplateView.as_view(template_name='web/robots.txt', content_type='text/plain')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
