from django.contrib import admin
from .models import *


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status', 'created')
    list_filter = ('status',)
    search_fields = ['title', 'body']
    prepropulated_fields = {'slug': ('title',)}


admin.site.register(BlogPost, PostAdmin)
