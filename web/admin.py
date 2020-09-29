from django.contrib import admin
from .models import *


admin.site.register(Technology)
admin.site.register(Education)
admin.site.register(Work)
admin.site.register(Project)
admin.site.register(Certification)
admin.site.register(Publication)
admin.site.register(Reference)

admin.site.index_title = 'Admin'
admin.site.site_title = 'Kenneth V. Domingo'
admin.site.site_header = 'kvdomingo.xyz administration'
