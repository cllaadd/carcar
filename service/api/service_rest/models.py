from django.db import models
from django.urls import reverse



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href= models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    id = models.PositiveSmallIntegerField(primary_key=True)

    def __str__(self):
        return {self.name}

    class Meta:
        ordering = ("id",)


class Appointment(models.Model):
    owner = models.CharField(max_length=100)
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField()
    reason = models.CharField(max_length=200)
    finished = models.BooleanField(default=False)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ("date",)
