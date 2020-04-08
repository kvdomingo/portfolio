from django.shortcuts import render


def index(request):
    context = {
        'active_page': 'index',
    }
    return render(request, 'web/index.html.j2', context)
