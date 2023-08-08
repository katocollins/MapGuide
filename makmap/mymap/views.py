from django.shortcuts import render
from django.http import JsonResponse
from .models import BuildingsM
import json

def map_view(request):
    return render(request, 'base.html')


def makView(request):
    buildings = BuildingsM.objects.all()

    data = [
        {
            'name': building.name,
            'latitude': float(building.latitude),
            'longitude': float(building.longitude),
            'description': building.description,
        }
        for building in buildings
    ]
    return JsonResponse(data, safe=False)
    
 
