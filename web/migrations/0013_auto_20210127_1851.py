# Generated by Django 3.1.5 on 2021-01-27 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("web", "0012_auto_20210127_1849"),
    ]

    operations = [
        migrations.AlterField(
            model_name="homepagecontent",
            name="link_to_portfolio",
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
