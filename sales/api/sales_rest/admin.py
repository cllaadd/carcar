from django.contrib import admin
from .models import Salesperson

@admin.register(Salesperson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass
