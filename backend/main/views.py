from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Category, Discount, Customer, Restaurant, MenuItem, Order
from .serializers import CategorySerializer, CreateOrderSerializer, DiscountSerializer, CustomUserSerializer, RestaurantSerializer, MenuItemSerializer, OrderSerializer
from .filters import MenuItemFilter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateOrderView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        
        # Extract the menu_items from the data
        menu_item_ids = data.pop('menu_items', [])
        
        # Create the order first without menu_items
        order = Order.objects.create(
            user=request.user,
            restaurant_id=data['restaurant'],
            status=data.get('status', 'Pending'),
            discount_id=data.get('discount')
        )
        
        # Add the menu_items to the order
        menu_items = MenuItem.objects.filter(id__in=menu_item_ids)
        order.menu_items.set(menu_items)
        
        # Calculate and update the total_amount
        order.total_amount = order.calculate_total_amount()
        order.save()

        return Response({"order_id": order.id, "total_amount": order.total_amount}, status=status.HTTP_201_CREATED)


class DiscountListCreateView(generics.ListCreateAPIView):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

class CustomerListView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        queryset = Customer.objects.all()
        params = self.request.query_params

        id = params.get('user_id', None)

        if id:
            queryset = queryset.filter(user=id)

        return queryset

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RestaurantListView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all().order_by('rating')  # Default ascending ordering by rating
    serializer_class = RestaurantSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['rating']  # Allows sorting by 'rating' field
    ordering = ['rating']  # Default ordering by rating in ascending order

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        params = self.request.query_params

        id = params.get('id', None)

        if id:
            queryset = queryset.filter(id=id)

        return queryset

class MenuItemListView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = MenuItemFilter
    search_fields = ['title']

    def get_queryset(self):
        queryset = MenuItem.objects.all()
        params = self.request.query_params

        restaurant = params.get('restaurant', None)

        if restaurant:
            queryset = queryset.filter(restaurant__id=restaurant)

        return queryset


class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        params = self.request.query_params

        id = params.get('user_id', None)
        status = params.get('status', None)

        if id:
            queryset = queryset.filter(user=id)

        if status:
            if status == 'pending':
                queryset = queryset.filter(status="Pending")
            elif status == "in_progress":
                queryset = queryset.filter(status="In Progress")
            elif status == "completed":
                queryset = queryset.filter(status="Completed")
            elif status == "cancelled":
                queryset = queryset.filter(status="Cancelled")

        return queryset
    

class CreateOrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer
