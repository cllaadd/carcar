from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'name',
        'employee_number',
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'id',
        'name',
        'address',
        'phone',
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'import_href',
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        'id',
        'automobile',
        'salesperson',
        'customer',
        'price',
    ]

    encoders = {
        'automobile': AutomobileVOEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder(),
    }
