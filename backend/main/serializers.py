from rest_framework import serializers
from .models import Category, Discount, Restaurant, MenuItem, Order, Address
from .models import Customer

from django.contrib.auth.models import AbstractUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'title']

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'title', 'desc', 'address', 'opening_hours', 'phone_number', 'image', 'rating']

class MenuItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = MenuItem
        fields = ['id', 'restaurant', 'category', 'title', 'image', 'price', 'description']

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['code', 'percentage', 'start_date', 'end_date', 'is_active']

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    discount = DiscountSerializer()
    restaurant = RestaurantSerializer()
    menu_items = MenuItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'restaurant', 'created_at', 'updated_at', 'status', 'total_amount', 'menu_items', 'discount']


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
