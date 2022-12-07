# Generated by Django 4.0.3 on 2022-12-07 20:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17, unique=True)),
                ('import_href', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('reason', models.CharField(max_length=200)),
                ('finished', models.BooleanField(default=False)),
                ('automobile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='service_rest.automobilevo')),
            ],
            options={
                'ordering': ('date',),
            },
        ),
    ]
