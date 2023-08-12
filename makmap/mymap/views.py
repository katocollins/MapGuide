from django.shortcuts import render
from django.http import JsonResponse
from .models import BuildingsM
import json

def map_view(request):
    return render(request, 'base.html')


def makView(request):
    buildings = BuildingsM.objects.all()
    #fetch data from the database

    data = [
        {
            'name': building.name,
            'latitude': float(building.latitude),
            'longitude': float(building.longitude),
            'description': building.description,
        }
        for building in buildings
    ]
    #produce json response of the data and pushes it to an API end point
    return JsonResponse(data, safe=False)
    
 
