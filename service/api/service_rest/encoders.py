from common.json import ModelEncoder

from .models import Technician


# class VinVOEncoder(ModelEncoder):
#     model = VinVO
#     properties = [
#         "id",
#         "name",
#     ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
    ]
