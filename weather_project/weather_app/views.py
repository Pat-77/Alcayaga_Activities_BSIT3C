import requests
from django.shortcuts import render
from datetime import datetime

API_KEY = 'b1565c11200eeb16d0219a3f923f73e5'

def home(request):
    city = request.GET.get('city')
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    unit = request.GET.get('unit', 'metric')  # 'metric' = Celsius, 'imperial' = Fahrenheit
    weather_data = None
    error = None

    try:
        if lat and lon:
            url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={unit}"
        elif city:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units={unit}"
        else:
            url = None

        if url:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                weather_data = response.json()
            else:
                error = "City not found."
    except requests.exceptions.Timeout:
        error = "Request timed out. Please try again."
    except requests.exceptions.RequestException:
        error = "An error occurred while fetching weather data."

    return render(request, 'weather_app/home.html', {
        'weather': weather_data,
        'error': error,
        'unit': unit,
        'now': datetime.now()
    })
