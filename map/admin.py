from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

# Register your models here.
admin.site.register(VillageSpot, LeafletGeoAdmin)
