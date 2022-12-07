from django.db import models

class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField()

    def __str__(self):
        return {self.name}

    class Meta:
        ordering = ("employee_number",)
