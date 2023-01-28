from django.contrib import sitemaps


class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = "weekly"

    def items(self):
        return [
            "",
            "/about",
            "/photography",
            "/photography/clients",
            "/svip",
            "/dev",
        ]

    def location(self, item):
        return item
