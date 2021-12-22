from django.contrib import admin
from .models import Client


class ClientAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "shoot_date")
    search_fields = ("name",)

    def view_on_site(self, obj):
        return f"/photography/clients/{obj.slug}"


admin.site.register(Client, ClientAdmin)
