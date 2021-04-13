from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=256)
    slug = models.SlugField(max_length=256)
    shoot_date = models.DateField(null=True, blank=True)
    cover_image = models.URLField(max_length=256)
    keywords = models.TextField(max_length=256, blank=True)

    class Meta:
        ordering = ['-shoot_date']

    def get_absolute_url(self):
        return f'/photography/clients/{self.slug}/'

    def __str__(self):
        return f'{self.name}'
