from django.http import HttpResponse


def index(request):
    return HttpResponse("Овде ќе биде мапата на Мариово!")
