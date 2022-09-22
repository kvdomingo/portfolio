from django.urls import path

from .views import BlogPostView, CourseView

app_name = "svip"

urlpatterns = [
    path("blogpost", BlogPostView.as_view()),
    path("course", CourseView.as_view()),
]
