from django.db import models
from django.urls import reverse



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href= models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.vin}"


class Technician(models.Model):
    name = models.CharField(max_length=100)
    id = models.PositiveSmallIntegerField(primary_key=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        ordering = ("id",)


class Appointment(models.Model):
    owner = models.CharField(max_length=100)
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField()
    reason = models.CharField(max_length=200)
    finished = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=17)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.vin}"

    def set_finished_true(self):
        self.finished = True

    def set_vip_true(self):
        self.vip = True

    class Meta:
        ordering = ("date",)
