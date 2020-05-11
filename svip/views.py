import pytz
from django.shortcuts import render
from django.conf import settings
from .models import *
from .serializers import *
from rest_framework import generics


def index(request):
    queryset = Course.objects.order_by('number').all()
    context = {
        'active_page': 'Signal, Video, Image Processing',
        'course_list': queryset,
    }
    return render(request, 'svip/index.html.j2', context)



def subject(request, subject_slug):
    subjects = Course.objects.order_by('number').all()
    this_subject = Course.objects.filter(slug=subject_slug).first()
    courses = BlogPost.objects.filter(status=1).filter(subject__slug=subject_slug).order_by('-created')
    context = {
        'active_page': courses.first().subject.name,
        'active_page_slug': subject_slug,
        'course_list': subjects,
        'post_list': courses,
        'subject_slug': subject_slug,
        'this_subject': this_subject,
    }
    return render(request, 'svip/subject.html.j2', context)


def post(request, subject_slug, post_slug):
    subject = Course.objects.filter(slug=subject_slug).first()
    subjects = Course.objects.order_by('number').all()
    post = BlogPost.objects.filter(slug=post_slug).first()
    post.created = post.created.replace(tzinfo=pytz.utc).astimezone(settings.LOCAL_TZ).strftime("%H:%M, %d %b %Y")
    context = {
        'active_page': post.title,
        'active_page_slug': subject_slug,
        'course_list': subjects,
        'post': post,
        'subject': subject,
    }
    return render(request, 'svip/post.html.j2', context)


class BlogPostApi(generics.ListAPIView):
    queryset = BlogPost.objects.all().order_by('-created')
    serializer_class = BlogPostSerializer
    filterset_fields = ['slug', 'subject__number', 'subject__slug']


class CourseApi(generics.ListAPIView):
    queryset = Course.objects.all().order_by('-number')
    serializer_class = CourseSerializer
    filterset_fields = ['number', 'slug']
