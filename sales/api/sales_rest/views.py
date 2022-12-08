from django.shortcuts import render
from .encoders import SalespersonEncoder, CustomerEncoder, SaleEncoder, AutomobileVOEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder = SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder = SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create salesperson"}
            )
            response.status_code = 400
            return response

# @require_http_methods(["GET"])
# def api_salesperson(request, employee_number):
#     salesperson=Salesperson.objects.get(employee_number=employee_number)
#     return JsonResponse(
#         salesperson,
#         encoder = SalespersonEncoder,
#         safe=False,
#     )


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder = CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_sales(request, salesperson_employee_number=None):
    if request.method == "GET":
        if salesperson_employee_number == None:
            sales = Sale.objects.all()
        else:
            employee_number = salesperson_employee_number
            salesperson = Salesperson.objects.get(employee_number=employee_number)
            sales = Sale.objects.filter(salesperson = salesperson)
        return JsonResponse(
            {"sales" : sales},
            encoder = SaleEncoder
        )
    else:
        content = json.loads(request.body)
        print("content", content)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile VIN"},
                status=400,
            )

        try:
            salesperson = Salesperson.objects.get(employee_number=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=400,
            )

        try:
            customer = Customer.objects.get(name=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer name"},
                status=400,
            )
        # print("content2", content)
        sale = Sale.objects.create(**content)
        # print(sale['automobile'])
        return JsonResponse(
            sale,
            encoder = SaleEncoder,
            safe=False,
        )
