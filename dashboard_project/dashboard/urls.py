from django.urls import path
from .views import dashboard_view, reports_view, settings_view

urlpatterns = [
    path("", dashboard_view, name="dashboard"),
    path("reports/", reports_view, name="reports"),
    path("settings/", settings_view, name="settings"),
]
