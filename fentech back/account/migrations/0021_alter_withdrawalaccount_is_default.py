# Generated by Django 5.1.4 on 2025-06-18 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0020_withdrawalaccount_is_default_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='withdrawalaccount',
            name='is_default',
            field=models.BooleanField(default=False, verbose_name='is default'),
        ),
    ]
