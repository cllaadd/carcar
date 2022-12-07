from django.db import models

class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField()

    def __str__(self):
        return {self.name}

    class Meta:
        ordering = ("employee_number",)

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return {self.name}
    class Meta:
        ordering = ("phone",)
