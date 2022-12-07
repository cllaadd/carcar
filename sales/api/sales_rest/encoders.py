from common.json import ModelEncoder
from .models import Salesperson

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'name',
        'employee_number'
    ]
