# Generated by Django 3.0.5 on 2020-04-27 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dev", "0002_auto_20200427_1649"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="organization_url",
            field=models.URLField(blank=True),
        ),
    ]
