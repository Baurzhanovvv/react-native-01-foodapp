# Generated by Django 4.2.14 on 2024-09-06 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0007_alter_restaurant_opening_hours"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="menu_items",
            field=models.ManyToManyField(to="main.menuitem"),
        ),
        migrations.DeleteModel(
            name="OrderItem",
        ),
    ]
