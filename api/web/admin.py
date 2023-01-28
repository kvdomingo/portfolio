from django.contrib import admin
from ordered_model.admin import OrderedModelAdmin

from .models import (
    AboutContent,
    Certification,
    Education,
    HomepageContent,
    Project,
    Publication,
    Reference,
    Technology,
    Work,
)


class HomepageContentAdmin(OrderedModelAdmin):
    list_display = ["section_header", "move_up_down_links"]


class TechnologyAdmin(OrderedModelAdmin):
    list_display_links = ["alt"]
    list_display = ["category", "order", "alt", "move_up_down_links"]


admin.site.register(HomepageContent, HomepageContentAdmin)
admin.site.register(AboutContent)
admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Education)
admin.site.register(Work)
admin.site.register(Project)
admin.site.register(Certification)
admin.site.register(Publication)
admin.site.register(Reference)

admin.site.index_title = "Admin"
admin.site.site_title = "KVD Studio"
admin.site.site_header = "KVD Studio Admin"
