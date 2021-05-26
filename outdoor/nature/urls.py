from django.urls import path
from . import views


app_name = 'nature'
urlpatterns = [
    path('', views.index, name="index"),
]