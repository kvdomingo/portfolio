from django.conf import settings
from django.contrib import admin
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from django.shortcuts import render
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from dev.models import Project
from photography.models import Client
from svip.models import BlogPost, Course
from web.sitemap import StaticViewSitemap

sitemaps = {
    "static": StaticViewSitemap,
    "photography": GenericSitemap(
        {"queryset": Client.objects.all()},
        priority=0.5,
        changefreq="monthly",
    ),
    "courses": GenericSitemap(
        {"queryset": Course.objects.all()},
        priority=0.5,
        changefreq="monthly",
    ),
    "blog": GenericSitemap(
        {"queryset": BlogPost.objects.all(), "date_field": "created"},
        priority=0.6,
        changefreq="weekly",
    ),
    "projects": GenericSitemap(
        {"queryset": Project.objects.all()},
        priority=0.6,
        changefreq="monthly",
    ),
}

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "robots.txt",
        TemplateView.as_view(template_name="web/robots.txt", content_type="text/plain"),
    ),
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
    path("api/auth/", include("rest_framework.urls")),
    path("tinymce/", include("tinymce.urls")),
    path("api/photography/", include("photography.urls")),
    path("api/svip/", include("svip.urls")),
    path("api/dev/", include("dev.urls")),
    path("api/", include("web.urls")),
]

if settings.IN_PRODUCTION:
    urlpatterns.append(re_path(r"^.*/?$", lambda r: render(r, "index.html")))
