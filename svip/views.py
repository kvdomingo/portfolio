import pytz
from django.views import generic
from django.shortcuts import render
from django.conf import settings
from .models import BlogPost


def index(request):
    queryset = BlogPost.objects.filter(status=1).filter(subject=186).order_by('-created')
    context = {
        'active_page': 'Video/Image Processing',
        'post_list': queryset,
    }
    return render(request, 'svip/index.html.j2', context)


def post(request, slug):
    query = BlogPost.objects.filter(slug=slug).first()
    query.created = query.created.replace(tzinfo=pytz.utc).astimezone(settings.LOCAL_TZ)
    context = {
        'active_page': 'Video/Image Processing',
        'post': query,
    }
    return render(request, 'svip/post.html.j2', context)
