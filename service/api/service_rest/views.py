from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=id).update(**content)
            technican = Technician.objects.get(id=id)
            return JsonResponse(
                technican,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
                return JsonResponse(
                {"message": "Invalid technician"},
                status=404,
            )


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
                status=404,
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
            technician = content["technician"]
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
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


@require_http_methods(["GET"])
def api_filtered_appointments(request, auto_vin=None):
    if auto_vin == None:
        appointments= Appointment.objects.filter(finished=False)
    else:
        vin = auto_vin
        appointments = Appointment.objects.filter(vin=vin)
    return JsonResponse(
        {"appointments": appointments},
        encoder=AppointmentEncoder,
        safe=False,
    )

@require_http_methods(["GET"])
def api_auto_vos(request, auto_vin=None):
    if auto_vin == None:
        autos = AutomobileVO.objects.all()
    else:
        vin = auto_vin
        autos = AutomobileVO.objects.filter(vin=vin)
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileVOEncoder,
        safe=False,
    )
