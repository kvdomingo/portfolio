from django.contrib import sitemaps


class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return [
            '',
            '/cv',
            '/photography',
            '/photography/clients',
            '/svip',
            '/dev',
        ]

    def location(self, item):
        return item
