from django.contrib.gis.db import models
class Buildings(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.name

class BuildingsM(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField()
    class Meta:
        db_table="mymap_buildingsm"
    def __str__(self):
        return self.name