"""
This module contains API views for managing items.
"""

import json  # Standard library first
import logging
from django.shortcuts import get_object_or_404  # Django imports after
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item

# Create a logger
logger = logging.getLogger(__name__)

# Get all items or search by name
def get_items(request):
    logger.info('Getting items')
    search_query = request.GET.get('search', None)
    
    if search_query:
        logger.info(f'Searching for items with name containing "{search_query}"')
        items = Item.objects.filter(name__icontains=search_query)
    else:
        logger.info('Getting all items')
        items = Item.objects.all()
    
    data = [
        {
            "id": item.id, 
            "name": item.name, 
            "description": item.description, 
            "price": float(item.price)
            } 
            for item in items
        ]
    
    logger.info(f'Retrieved {len(items)} items')
    return JsonResponse({"items": data})

# Get a single item by ID
def get_item(request, item_id):
    logger.info(f'Getting item with ID {item_id}')
    item = get_object_or_404(Item, id=item_id)
    data = {"id": item.id, "name": item.name, "description": item.description, "price": float(item.price)}
    logger.info(f'Retrieved item with ID {item_id}')
    return JsonResponse(data)

# Add a new item
@csrf_exempt
def add_item(request):
    logger.info('Adding new item')
    
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            item = Item.objects.create(
                name=data["name"],
                description=data.get("description", ""),
                price=data["price"]
            )
            logger.info(f'Added item with ID {item.id}')
            return JsonResponse({"message": "Item added", "id": item.id}, status=201)

        except Exception as e:  # ✅ Properly handling errors
            logger.error(f'Failed to add item: {str(e)}')
            return JsonResponse({"message": "Failed to add item", "error": str(e)}, status=400)

            
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Item
from .serializers import ItemSerializer


class ItemView(APIView):
    def get(self, request):
        search_query = request.GET.get('search', None)
        if search_query:
            items = Item.objects.filter(name__icontains=search_query)
        else:
            items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetailView(APIView):
    def get(self, request, item_id):
        item = get_object_or_404(Item, id=item_id)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, item_id):
        item = get_object_or_404(Item, id=item_id)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id):
        try:
            item = get_object_or_404(Item, id=item_id)
            item.delete()
            logger.info(f'Deleted item with ID {item_id}')
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:  # ✅ Exception handling moved inside try block
            logger.error(f'Failed to delete item: {str(e)}')
            return JsonResponse({"message": "Failed to delete item", "error": str(e)}, status=400)

# Update an item
@csrf_exempt
def update_item(request, item_id):
    logger.info(f'Updating item with ID {item_id}')
    item = get_object_or_404(Item, id=item_id)
    if request.method == "PUT":
        data = json.loads(request.body)
        try:
            item.name = data.get("name", item.name)
            item.description = data.get("description", item.description)
            item.price = data.get("price", item.price)
            item.save()
            logger.info(f'Updated item with ID {item_id}')
            return JsonResponse({"message": "Item updated"})
        except Exception as e:
            logger.error(f'Failed to update item: {str(e)}')
            return JsonResponse({"message": "Failed to update item"}, status=400)

# Delete an item
@csrf_exempt
def delete_item(request, item_id):
    logger.info(f'Deleting item with ID {item_id}')
    item = get_object_or_404(Item, id=item_id)
    try:
        item.delete()
        logger.info(f'Deleted item with ID {item_id}')
        return JsonResponse({"message": "Item deleted"})
    except Exception as e:
        logger.error(f'Failed to delete item: {str(e)}')
        return JsonResponse({"message": "Failed to delete item"}, status=400)
