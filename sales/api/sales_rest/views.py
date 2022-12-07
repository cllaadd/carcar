from django.shortcuts import render
from .encoders import SalespersonEncoder
from .models import Salesperson
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
                {"message": "Cold not create salesperson"}
            )
            response.status_code = 400
            return response
