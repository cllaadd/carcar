from common.json import ModelEncoder
import json
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
        "id",
        "owner",
        "reason",
        "technician",
        "vin",
    ]
    encoders = {
        'technician': TechnicianEncoder(),
    }

    def get_extra_data(self,o):
        date = json.dumps(o.date, default=str)
        time = json.dumps(o.time, default=str)
        date = json.loads(date)
        time = json.loads(time)
        return {"date" : date,
                "time" : time, }
