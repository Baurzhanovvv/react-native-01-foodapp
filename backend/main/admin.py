# admin.py
from django.contrib import admin
from .models import Category, Discount, Restaurant, MenuItem, Order, Address

admin.site.register(Address)
admin.site.register(Discount)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title',)
    ordering = ('title',)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'opening_hours', 'phone_number', 'rating')
    search_fields = ('title', 'opening_hours')
    list_filter = ('opening_hours', 'rating')
    ordering = ('title',) # Если у вас есть ManyToMany поле

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'restaurant', 'category', 'title', 'price')
    search_fields = ('title', 'description')
    list_filter = ('restaurant', 'category')
    ordering = ('title',)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'restaurant', 'total_amount', 'status', 'created_at')
    filter_horizontal = ('menu_items',)  # Для удобного добавления MenuItem через интерфейс
    
    def save_model(self, request, obj, form, change):
        # Сначала сохраняем объект, чтобы получить ID заказа
        super().save_model(request, obj, form, change)
        
        # Затем добавляем связанные элементы и считаем сумму
        obj.total_amount = obj.calculate_total_amount()
        obj.save()

admin.site.register(Order, OrderAdmin)