# Generated by Django 3.0.5 on 2020-04-14 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("photography", "0003_auto_20200414_1622"),
    ]

    operations = [
        migrations.AlterField(
            model_name="client",
            name="keywords",
            field=models.TextField(blank=True, max_length=256),
        ),
        migrations.AlterField(
            model_name="client",
            name="shoot_date",
            field=models.DateField(blank=True, null=True),
        ),
    ]
