from django.contrib import admin
from ordered_model.admin import OrderedModelAdmin

from .models import Project


class ProjectAdmin(OrderedModelAdmin):
    list_display = ("title", "slug", "organization", "project_url", "move_up_down_links")
    list_display_links = ("title",)
    list_filter = ("title", "organization")
    search_fields = ["title", "organization"]
    prepopulated_fields = {"slug": ["title"]}


admin.site.register(Project, ProjectAdmin)
