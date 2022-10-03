from rest_framework.generics import ListAPIView

from .models import BlogPost, Course
from .serializers import BlogPostSerializer, CourseSerializer


class BlogPostView(ListAPIView):
    queryset = BlogPost.objects.filter(status=1).select_related("subject").all()
    serializer_class = BlogPostSerializer
    filterset_fields = ["slug", "subject__number", "subject__slug"]


class CourseView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filterset_fields = ["number", "slug"]
