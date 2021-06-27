from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = "mariovo/index.html"


class MariovoRegionView(TemplateView):
    template_name = "mariovo/region.html"
