# Generated by Django 5.1.4 on 2025-05-02 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0018_moneytransaction_approver'),
    ]

    operations = [
        migrations.AddField(
            model_name='moneytransaction',
            name='read_by_approver',
            field=models.BooleanField(default=False, verbose_name='read by approver'),
        ),
    ]
