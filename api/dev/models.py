from django.db import models
from django.utils.translation import gettext_lazy as _
from ordered_model.models import OrderedModel


class ProjectStatus(models.TextChoices):
    IN_PROGRESS = "WIP", _("In Progress")
    LIVE = "LIV", _("Live")
    ARCHIVED = "OFF", _("Archived")


class Project(OrderedModel):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True, db_index=True)
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
    status = models.CharField(max_length=3, choices=ProjectStatus.choices)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "/dev"
