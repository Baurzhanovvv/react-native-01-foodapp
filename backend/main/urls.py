from django.urls import path, include

from .views import CategoryListView, CreateOrderView, DiscountListCreateView, CustomerListView, RestaurantListView, MenuItemListView, OrderListView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('menu-items/', MenuItemListView.as_view(), name='menuitem-list'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('create/order/', CreateOrderView.as_view()),
    path('customer/', CustomerListView.as_view()),
    path('discount', DiscountListCreateView.as_view())
]
