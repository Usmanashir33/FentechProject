# Generated by Django 5.1.4 on 2024-12-28 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0013_rename_signature_kyc_signature_pic_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kyc',
            name='full_name',
            field=models.CharField(blank=True, max_length=100, verbose_name='Full Name '),
        ),
    ]
