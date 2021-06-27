from django.urls import path
from . import views


app_name = 'mariovo'
urlpatterns = [
    path('', views.HomeView.as_view(), name="index"),
    path('region/', views.MariovoRegionView.as_view(), name="region")
]
