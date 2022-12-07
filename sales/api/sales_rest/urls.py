from django.urls import path
from .views import api_salespeople, api_customers, api_sales

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/new/", api_salespeople, name="api_create_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/new/", api_customers, name="api_create_customer"),
    path("sales/", api_sales, name="api_all_sales"),
    path("sales/<int:salesperson_employee_number>/", api_sales, name="api_sales_history"),
    path("sales/new", api_sales, name="api_create_sale"),
]
