from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=256, null=True, blank=True)
    pfp = models.ImageField(upload_to="pfp/", null=True)
    phone_number = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.user.username

class Address(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Restaurant(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)
    opening_hours = models.TimeField(default="8:00")
    phone_number = models.CharField(max_length=20)
    image = models.ImageField(upload_to="logo/")
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.title} - {self.opening_hours}"

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="menu/")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return f"{self.restaurant.title} - {self.title}"

class Discount(models.Model):
    code = models.CharField(max_length=50, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} - {self.percentage}%"

class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, related_name='orders', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default="Pending")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    menu_items = models.ManyToManyField(MenuItem)
    discount = models.ForeignKey(Discount, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'Order {self.id} by {self.user.username}'

    def calculate_total_amount(self):
        total = sum(item.price for item in self.menu_items.all())
        if self.discount and self.discount.is_active:
            discount_amount = total * (self.discount.percentage / 100)
            total -= discount_amount
        return total

