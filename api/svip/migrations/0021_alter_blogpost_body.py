# Generated by Django 4.0 on 2022-10-03 06:24

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('svip', '0020_auto_20210729_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='body',
            field=tinymce.models.HTMLField(blank=True),
        ),
    ]
