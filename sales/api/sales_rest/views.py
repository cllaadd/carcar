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
            return JsonResponse(
                {"message": "Could not create salesperson"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson(request, employee_number):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=employee_number)
            return JsonResponse(
                salesperson,
                encoder = SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status = 404,
            )
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=employee_number)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=employee_number)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder = SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status = 404
            )


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
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder = CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 404,
            )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)

            props = ["name", "phone", "address"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder = CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 404
            )


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
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile VIN"},
                status=404,
            )

        try:
            salesperson = Salesperson.objects.get(employee_number=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=404,
            )

        try:
            customer = Customer.objects.get(name=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer name"},
                status=404,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder = SaleEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder = SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status = 404,
            )
    else:
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"}
            )
