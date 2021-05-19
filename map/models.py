from django.db import models
from djgeojson.fields import PointField

class VillageSpot(models.Model):
    geom = PointField()
