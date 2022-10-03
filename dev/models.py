from django.db import models
from ordered_model.models import OrderedModel


class Project(OrderedModel):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True)
    organization = models.CharField(max_length=256, blank=True)
    organization_url = models.URLField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    summary = models.TextField(blank=True)
    body = models.TextField(blank=True)
    project_url = models.URLField()
    keywords = models.TextField(blank=True)
    technologies = models.TextField(blank=True)
    cover_photo = models.URLField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "/dev"
