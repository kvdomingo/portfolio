# Generated by Django 3.0.5 on 2020-04-13 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0014_auto_20200412_1547"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="keywords",
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
