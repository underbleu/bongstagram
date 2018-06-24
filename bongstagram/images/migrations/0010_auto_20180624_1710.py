# Generated by Django 2.0.4 on 2018-06-24 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0009_image_txhash'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='copyrightIssue',
            field=models.CharField(default='pending', max_length=500),
        ),
        migrations.AddField(
            model_name='image',
            name='currentOwner',
            field=models.CharField(default='pending', max_length=500),
        ),
        migrations.AddField(
            model_name='image',
            name='originalOwner',
            field=models.CharField(default='pending', max_length=500),
        ),
        migrations.AddField(
            model_name='image',
            name='prevOwner',
            field=models.CharField(default='pending', max_length=500),
        ),
    ]
