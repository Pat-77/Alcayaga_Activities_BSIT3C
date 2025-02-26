from django.shortcuts import render

# Create your views here.
def dashboard_view(request):
    data = [
        {"title": "Users", "count": 150},
        {"title": "Orders", "count": 320},
        {"title": "Revenue", "count": 12450},
    ]
    return render(request, "dashboard/dashboard.html", {"data": data})

def reports_view(request):
    return render(request, "dashboard/reports.html")

def settings_view(request):
    return render(request, "dashboard/settings.html")