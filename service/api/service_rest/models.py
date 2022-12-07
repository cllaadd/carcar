from django.db import models
from django.urls import reverse

# class VinVO(models.model):
#     id = models.CharField(max_length=17, unique=True)

# class Status(models.Model):
#     id = models.PositiveSmallIntegerField(primary_key=True)
#     name = models.CharField(max_length=10, unique=True)

#     def __str__(self):
#         return self.name


class Technician(models.Model):
    name = models.CharField(max_length=100)
    id = models.PositiveSmallIntegerField(primary_key=True)

    class Meta:
        ordering = ("id",)


# class Appointment(models.Model):
#     owner = models.CharField(max_length=100)
#     date = models.DateField(_(""), auto_now=False, auto_now_add=False)
#     time = models.TimeField()
#     reason = models.CharField(max_length=200)

#     vin = models.ForeignKey(
#         VinVO,
#         related_name="appointments",
#         on_delete=models.CASCADE,
#     )

#     status = models.ForeignKey(
#         Status,
#         related_name="appointments",
#         on_delete=models.PROTECT,
#     )

#     class Meta:
#         ordering = ("date",)
