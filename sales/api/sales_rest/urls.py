from django.urls import path
from .views import api_salespeople, api_customers

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/new/", api_salespeople, name="api_create_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/new/", api_customers, name="api_create_customer"),
]
