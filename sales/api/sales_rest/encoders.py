from common.json import ModelEncoder
from .models import Salesperson, Customer

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'name',
        'employee_number',
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone',
    ]
