from django.contrib import admin
from .models import Project


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'organization', 'project_url')
    list_display_links = ('title',)
    list_filter = ('title', 'organization')
    search_fields = ['title', 'organization']
    prepopulated_fields = {'slug': ['title']}


admin.site.register(Project, ProjectAdmin)
