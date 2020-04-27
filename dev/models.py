from tinymce import HTMLField
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True)
    organization = models.CharField(max_length=256, blank=True)
    organization_url = models.URLField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True)
    summary = models.TextField(blank=True)
    body = HTMLField('Body', blank=True)
    project_url = models.URLField()
    keywords = models.TextField(max_length=256, blank=True)
    cover_photo = models.URLField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return f'/dev/{self.slug}/'
