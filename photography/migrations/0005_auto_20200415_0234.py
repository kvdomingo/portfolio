# Generated by Django 3.0.5 on 2020-04-14 18:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photography', '0004_auto_20200414_1627'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='client',
            options={'ordering': ['-shoot_date']},
        ),
    ]
