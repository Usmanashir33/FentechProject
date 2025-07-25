# Generated by Django 5.1.4 on 2025-03-23 18:36

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_alter_moneynotification_options_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('body', models.CharField(max_length=50, verbose_name='Body')),
                ('date', models.DateTimeField(auto_now=True)),
                ('viewed', models.BooleanField(default=False, verbose_name='viewed')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='moneynotifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Notification',
                'verbose_name_plural': 'Notifications',
            },
        ),
        migrations.DeleteModel(
            name='MoneyNotification',
        ),
    ]
