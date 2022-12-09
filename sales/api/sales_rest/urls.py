from django.urls import path
from .views import api_salespeople, api_salesperson, api_customers, api_customer, api_sales, api_sale

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:employee_number>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_all_sales"),
    path("sales/<int:salesperson_employee_number>/", api_sales, name="api_sales_history"),
    path("sales/sale/<int:id>/", api_sale, name="api_sale"),
]
