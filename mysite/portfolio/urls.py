# portfolio/urls.py
from django.urls import path
from . import views

app_name = 'portfolio'  # Ensure you define the namespace

urlpatterns = [
    path('', views.portfolio, name='portfolio'),   # Home page
    path('resume/', views.resume, name='resume'),  # Resume page
    path('projects/', views.projects, name='projects'),  # Make sure this is added
    path('contact/', views.contact, name='contact'),  # Make sure contact is here too
]
