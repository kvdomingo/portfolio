# Generated by Django 4.0 on 2023-01-28 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dev', '0007_project_technologies_alter_project_keywords'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('WIP', 'In Progress'), ('LIV', 'Live'), ('OFF', 'Archived')], default='LIV', max_length=3),
            preserve_default=False,
        ),
    ]
