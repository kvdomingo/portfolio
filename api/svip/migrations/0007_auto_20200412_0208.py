# Generated by Django 3.0.5 on 2020-04-11 18:08

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0006_auto_20200411_1423"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="body",
            field=tinymce.models.HTMLField(verbose_name="Body"),
        ),
    ]
