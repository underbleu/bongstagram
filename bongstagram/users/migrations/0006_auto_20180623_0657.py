# Generated by Django 2.0.4 on 2018-06-22 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20180424_0703'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=500, verbose_name='Name of User'),
        ),
    ]
