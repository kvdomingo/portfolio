from rest_framework.generics import ListAPIView

from .models import BlogPost, Course
from .serializers import BlogPostSerializer, CourseSerializer


class BlogPostView(ListAPIView):
    queryset = BlogPost.objects.filter(status=1).select_related("subject").order_by("-created").all()
    serializer_class = BlogPostSerializer
    filterset_fields = ["slug", "subject__number", "subject__slug"]


class CourseView(ListAPIView):
    queryset = Course.objects.order_by("-number").all()
    serializer_class = CourseSerializer
    filterset_fields = ["number", "slug"]
