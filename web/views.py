from django.db.models import F
from .serializers import *
from rest_framework import generics


class EducationApi(generics.ListAPIView):
    queryset = Education.objects.all().order_by('-end_date', '-start_date')
    serializer_class = EducationSerializer


class WorkApi(generics.ListAPIView):
    queryset = Work.objects.all().order_by(F('end_date').desc(nulls_first=True), '-start_date')
    serializer_class = WorkSerializer


class ProjectApi(generics.ListAPIView):
    queryset = Project.objects.all().order_by(F('end_date').desc(nulls_first=True), '-start_date')
    serializer_class = ProjectSerializer


class CertificationApi(generics.ListAPIView):
    queryset = Certification.objects.all().order_by('-date_granted')
    serializer_class = CertificationSerializer


class PublicationApi(generics.ListAPIView):
    queryset = Publication.objects.all().order_by('-publication_date')
    serializer_class = PublicationSerializer


class ReferenceApi(generics.ListAPIView):
    queryset = Reference.objects.all().order_by('id')
    serializer_class = ReferenceSerializer
