from rest_framework import serializers
from .models import Item  # Fix import (use relative import)

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
