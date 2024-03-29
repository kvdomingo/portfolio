# Generated by Django 3.0.5 on 2020-04-12 07:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("svip", "0010_course_slug"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="course",
            field=models.ForeignKey(
                default=186,
                on_delete=django.db.models.deletion.CASCADE,
                to="svip.Course",
                to_field="number",
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="blogpost",
            name="subject",
            field=models.IntegerField(
                choices=[
                    (0, None),
                    (186, "Applied Physics 186"),
                    (187, "Applied Physics 187"),
                ]
            ),
        ),
    ]
