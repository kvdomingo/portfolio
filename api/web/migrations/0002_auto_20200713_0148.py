# Generated by Django 3.0.8 on 2020-07-12 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("web", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="end_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="work",
            name="end_date",
            field=models.DateField(blank=True, null=True),
        ),
    ]
