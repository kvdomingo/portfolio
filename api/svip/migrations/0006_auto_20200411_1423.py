# Generated by Django 3.0.5 on 2020-04-11 06:23

from django.db import migrations, models
import svip.models


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0005_auto_20200410_1726"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="created",
            field=models.DateTimeField(default=svip.models.set_aware_time),
        ),
    ]
