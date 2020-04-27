from django.contrib import sitemaps
from django.urls import reverse


class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return [
            'web:index',
            'web:cv',
            'photography:index',
            'photography:clients',
            'svip:index',
            'dev:index',
        ]

    def location(self, item):
        return reverse(item)