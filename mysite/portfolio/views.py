# portfolio/views.py
from django.shortcuts import render

def portfolio(request):
    """ Render the main portfolio page """
    return render(request, 'pages/portfolio.html')

def resume(request):
    """ Render the resume page """
    return render(request, 'pages/resume.html')

def projects(request):
    """ Render the projects page """
    return render(request, 'pages/projects.html')

def contact(request):
    """ Render the contact page """
    return render(request, 'pages/contact.html')
