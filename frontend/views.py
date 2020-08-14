from django.shortcuts import render


def index(request):
    context = dict(
        active_page = 'Beta',
    )
    return render(request, 'frontend/index.html', context)
