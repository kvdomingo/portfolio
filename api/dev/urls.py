from django.urls import path

from .views import ProjectView

app_name = "dev"

urlpatterns = [
    path("project", ProjectView.as_view()),
]
