# Generated by Django 3.0.5 on 2020-05-14 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0018_auto_20200415_0401"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="body",
            field=models.TextField(blank=True),
        ),
    ]
