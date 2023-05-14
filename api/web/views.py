from django.db.models import F
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import (
    AboutContent,
    Certification,
    Education,
    HomepageContent,
    Project,
    Publication,
    Reference,
    Technology,
    Work,
)
from .serializers import (
    AboutContentSerializer,
    CertificationSerializer,
    EducationSerializer,
    HomepageContentSerializer,
    ProjectSerializer,
    PublicationSerializer,
    ReferenceSerializer,
    TechnologySerializer,
    WorkSerializer,
)


@api_view()
def cv_view(_):
    data = dict(
        education=EducationSerializer(Education.objects.all(), many=True).data,
        work=WorkSerializer(
            Work.objects.order_by(
                F("end_date").desc(nulls_first=True), "-start_date"
            ).all(),
            many=True,
        ).data,
        certification=CertificationSerializer(
            Certification.objects.all(), many=True
        ).data,
        project=ProjectSerializer(
            Project.objects.order_by(
                F("end_date").desc(nulls_first=True), "-start_date"
            ).all(),
            many=True,
        ).data,
        publication=PublicationSerializer(Publication.objects.all(), many=True).data,
        reference=ReferenceSerializer(Reference.objects.all(), many=True).data,
    )
    return Response(data)


class HomepageContentView(ListAPIView):
    queryset = HomepageContent.objects.all()
    serializer_class = HomepageContentSerializer


class AboutContentView(ListAPIView):
    queryset = AboutContent.objects.all()
    serializer_class = AboutContentSerializer


class TechnologyView(ListAPIView):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer


class EducationView(ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class WorkView(ListAPIView):
    queryset = Work.objects.order_by(
        F("end_date").desc(nulls_first=True), "-start_date"
    ).all()
    serializer_class = WorkSerializer


class ProjectView(ListAPIView):
    queryset = Project.objects.order_by(
        F("end_date").desc(nulls_first=True), "-start_date"
    ).all()
    serializer_class = ProjectSerializer


class CertificationView(ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class PublicationView(ListAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer


class ReferenceView(ListAPIView):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer
