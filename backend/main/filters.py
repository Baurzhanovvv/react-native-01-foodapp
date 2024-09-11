

from django_filters import rest_framework as filters
from .models import MenuItem

class MenuItemFilter(filters.FilterSet):
    restaurant_title = filters.CharFilter(field_name='restaurant__title', lookup_expr='icontains')
    category_title = filters.CharFilter(field_name='category__title', lookup_expr='icontains')

    class Meta:
        model = MenuItem
        fields = ['restaurant_title', 'category_title']
