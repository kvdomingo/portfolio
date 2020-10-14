from django.contrib import admin
from ordered_model.admin import OrderedModelAdmin
from .models import *


class TechnologyAdmin(OrderedModelAdmin):
    list_display_links = ['alt']
    list_display = ['category', 'order', 'alt', 'move_up_down_links']


admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Education)
admin.site.register(Work)
admin.site.register(Project)
admin.site.register(Certification)
admin.site.register(Publication)
admin.site.register(Reference)

admin.site.index_title = 'Admin'
admin.site.site_title = 'Kenneth V. Domingo'
admin.site.site_header = 'kvdomingo.xyz administration'
