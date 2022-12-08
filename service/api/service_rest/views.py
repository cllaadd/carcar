from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json

from .encoders import TechnicianEncoder, AppointmentEncoder, AutomobileVOEncoder
from .models import Technician, Appointment, AutomobileVO



@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_appointments(request, auto_vin=None):
    if request.method == "GET":
        if auto_vin == None:
            appointments= Appointment.objects.all()
        else:
            vin = auto_vin
            appointments = Appointment.objects.filter(vin=vin)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        print("content: ", content)
        try:
            technician = content["technician"]
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician

        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

@require_http_methods(["GET", "PUT","DELETE"])
def api_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technician.objects.get(id=id)
                technician_name = technician["name"]
                content["technician"] = technician_name
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


# @require_http_methods(["GET", "PUT","DELETE"])
# def api_vips(request, id):
#         try:
#             auto = AutomobileVO.objects.get(vin=content["automobile"])
#             print("test: ", auto.vin, type(auto))
#         except AutomobileVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid automobile VIN"},
#                 status=400,
#             )
