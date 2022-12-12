from django.urls import path
from .views import (api_technicians,
                    api_technician,
                    api_appointments,
                    api_appointment,
                    api_filtered_appointments,
                    api_auto_vos,
                    )

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        "technicians/<int:id>/",
        api_technician,
        name="api_technician",
    ),
    path(
        "appointments/",
        api_appointments,
        name="api_appointments",
    ),
    path(
        "appointments/filtered/",
        api_filtered_appointments,
        name="api_filtered_appointments",
    ),
    path(
        "appointments/<str:auto_vin>/",
        api_appointments,
        name="api_appointments_by_vin",
    ),
    path(
        "appointments/edit/<int:id>/",
        api_appointment,
        name="api_appointment",
    ),
    path(
        "autovos/",
        api_auto_vos,
        name="api_auto_vos",
    ),
    ]
