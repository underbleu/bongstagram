# Generated by Django 2.0.4 on 2018-06-28 06:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0010_auto_20180624_1710'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='copyrightIssue',
        ),
        migrations.RemoveField(
            model_name='image',
            name='currentOwner',
        ),
        migrations.RemoveField(
            model_name='image',
            name='originalOwner',
        ),
        migrations.RemoveField(
            model_name='image',
            name='prevOwner',
        ),
    ]