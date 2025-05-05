"""
URL configuration for the weather_app.

Maps URLs to views.
"""


from django.urls import path
from .views import home

urlpatterns = [
    path('', home, name='home'),
]
