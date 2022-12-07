from django.contrib import admin
from .models import Salesperson, Customer

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
