from django.contrib import admin
from django.urls import reverse
from .models import BlogPost, Course


def make_published(modeladmin, request, queryset):
    queryset.update(status=1)
make_published.short_description = 'Publish selected articles'

def make_unpublished(modeladmin, request, queryset):
    queryset.update(status=0)
make_unpublished.short_description = 'Unpublish selected articles'

class PostAdmin(admin.ModelAdmin):
    list_display = ('subject', 'title', 'slug', 'status', 'created', 'modified')
    list_display_links = ('title',)
    list_filter = ('status', 'subject')
    list_editable = ('status',)
    search_fields = ['title', 'body']
    prepropulated_fields = {'slug': ('title',)}
    actions = (make_published, make_unpublished)

    def view_on_site(self, obj):
        return reverse('svip:post', args=(obj.subject.slug, obj.slug))


class CourseAdmin(admin.ModelAdmin):
    list_display = ('slug', 'name', 'title')
    list_display_links = ('name', )


admin.site.index_title = 'Admin'
admin.site.site_title = 'Kenneth V. Domingo'
admin.site.site_header = 'kvdomingo.xyz administration'
admin.site.register(BlogPost, PostAdmin)
admin.site.register(Course, CourseAdmin)
