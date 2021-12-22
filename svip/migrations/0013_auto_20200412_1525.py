# Generated by Django 3.0.5 on 2020-04-12 07:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0012_auto_20200412_1522"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="subject",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="posts",
                to="svip.Course",
                to_field="number",
            ),
        ),
    ]
