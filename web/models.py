from django.db import models
from django.utils.translation import gettext_lazy as _
from ordered_model.models import OrderedModel


class HomepageContent(OrderedModel):
    section_header = models.CharField(max_length=32)
    section_body = models.TextField(blank=True)
    link_to_portfolio = models.CharField(max_length=256, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.section_header


class AboutContent(models.Model):
    picture = models.CharField(max_length=256)
    bio = models.TextField(blank=True)


class Technology(OrderedModel):
    class Category(models.TextChoices):
        BACKEND = "BE", _("Backend")
        FRONTEND = "FE", _("Frontend")
        DATABASE = "DB", _("Database")
        DATAVIS = "DV", _("Data & Vis")
        CICD = "CI", _("CI/CD & Cloud")

    category = models.CharField(max_length=2, choices=Category.choices)
    alt = models.CharField(max_length=255)
    url = models.URLField(max_length=254)

    order_with_respect_to = "category"

    class Meta:
        ordering = ["category", "order"]
        verbose_name_plural = "technologies"

    def __str__(self):
        return f"[{self.category}] {self.alt}"


class Education(models.Model):
    university = models.CharField(max_length=64)
    department = models.CharField(max_length=64)
    department_url = models.URLField(max_length=254)
    degree = models.CharField(max_length=64)
    thesis = models.CharField(max_length=255, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ["-end_date", "-start_date"]

    def __str__(self):
        if self.end_date:
            end_year = self.end_date.year
        else:
            end_year = "present"
        return f"{self.university} ({self.start_date.year} - {end_year})"


class Work(models.Model):
    position = models.CharField(max_length=64)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    institution = models.CharField(max_length=64)
    institution_url = models.URLField(max_length=64)
    description = models.TextField(blank=True)
    related_project = models.CharField(max_length=254, blank=True)

    class Meta:
        ordering = ["-end_date", "-start_date"]

    def __str__(self):
        if self.end_date:
            end_year = self.end_date.year
        else:
            end_year = "present"
        return f"{self.position}, {self.institution} ({self.start_date.year} - {end_year})"


class Project(models.Model):
    name = models.CharField(max_length=64)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    link_header = models.CharField(max_length=64)
    link_url = models.URLField(max_length=254)
    description = models.TextField()

    class Meta:
        ordering = ["-end_date", "-start_date"]

    def __str__(self):
        if self.end_date:
            end_year = self.end_date.year
        else:
            end_year = "present"
        return f"{self.name} ({self.start_date.year} - {end_year})"


class Certification(models.Model):
    name = models.CharField(max_length=64)
    date_granted = models.DateField()
    date_expired = models.DateField(blank=True, null=True)
    institution = models.CharField(max_length=64)
    institution_url = models.URLField(max_length=254)
    description = models.TextField()

    class Meta:
        ordering = ["-date_granted"]

    def __str__(self):
        return f"{self.name} ({self.institution})"


class Publication(models.Model):
    title = models.CharField(max_length=255)
    publication_date = models.DateField()
    journal = models.CharField(max_length=64)
    volume = models.IntegerField()
    journal_code = models.CharField(max_length=32)
    url = models.URLField(max_length=254)
    description = models.TextField()

    class Meta:
        ordering = ["-publication_date"]

    def __str__(self):
        return f"{self.title} ({self.publication_date.year})"


class Reference(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=254)
    institution = models.CharField(max_length=64)
    position = models.CharField(max_length=64)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name} ({self.email})"
