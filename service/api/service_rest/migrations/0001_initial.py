# Generated by Django 4.0.3 on 2022-12-06 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('id', models.PositiveSmallIntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]
