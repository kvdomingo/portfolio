from django.shortcuts import render
from .models import Project
from .serializers import *
from rest_framework import generics


# def index(request):
#     context = {
#         'active_page': 'Development',
#         'projects': Project.objects.all(),
#     }
#     return render(request, 'dev/index.html.j2', context)
#
# def project(request, slug):
#     projects = Project.objects.all()
#     project = projects.get(slug=slug)
#     project.start_date = project.start_date.strftime('%b %Y')
#     project.end_date = project.end_date.strftime('%b %Y')
#     context = {
#         'active_page': project.title,
#         'active_page_slug': project.slug,
#         'this_project': project,
#         'all_projects': projects,
#     }
#     return render(request, 'dev/project.html.j2', context)


class ProjectApi(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['slug']
