# Generated by Django 5.1.4 on 2025-04-15 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0005_alter_notification_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('success', 'success'), ('failure', 'failure'), ('promotion', 'promotion'), ('info', 'info')], default='success', max_length=50, verbose_name=' Type'),
        ),
    ]
