# Generated by Django 2.0.4 on 2018-06-19 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0006_auto_20180427_0120'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='tokenId',
            field=models.CharField(default='NO COPYRIGHT', max_length=150),
        ),
    ]
