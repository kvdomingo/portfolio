from django.contrib import admin
from django_admin_relation_links import AdminChangeLinksMixin
from django.urls import reverse
from .models import BlogPost, Course


def make_published(modeladmin, request, queryset):
    queryset.update(status=1)
make_published.short_description = 'Publish selected articles'

def make_unpublished(modeladmin, request, queryset):
    queryset.update(status=0)
make_unpublished.short_description = 'Unpublish selected articles'

class PostAdmin(AdminChangeLinksMixin, admin.ModelAdmin):
    list_display = ('subject', 'title', 'slug', 'status', 'created', 'modified')
    list_display_links = ('title',)
    list_filter = ('status', 'subject__name')
    list_editable = ('status',)
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ['title']}
    actions = (make_published, make_unpublished)
    change_links = ('subject',)

    def view_on_site(self, obj):
        return reverse('svip:post', args=(obj.subject.slug, obj.slug))


class PostInline(admin.StackedInline):
    model = BlogPost
    extra = 1
    max_num = 2
    show_change_link = True


class CourseAdmin(AdminChangeLinksMixin, admin.ModelAdmin):
    list_display = ('slug', 'name', 'title')
    list_display_links = ('name', )
    changelist_links = ('posts',)


admin.site.register(BlogPost, PostAdmin)
admin.site.register(Course, CourseAdmin)
