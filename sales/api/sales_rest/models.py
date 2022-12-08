from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.vin}"


class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField()

    def __str__(self):
        return f"{self.name}"

    class Meta:
        ordering = ("employee_number",)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name}"
    class Meta:
        ordering = ("phone",)


class Sale(models.Model):
    price = models.BigIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        unique=True,
        related_name = "sales",
        on_delete=models.PROTECT,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name= "sales",
        on_delete= models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.automobile.vin}"
