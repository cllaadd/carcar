from common.json import ModelEncoder

from .models import Technician, Appointment, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "model",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner",
        "date",
        "time",
        "reason",
        "automobile",
    ]
