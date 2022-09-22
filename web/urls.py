from django.urls import path

from . import views

app_name = "web"

urlpatterns = [
    path("home/about", views.AboutContentView.as_view()),
    path("home/content", views.HomepageContentView.as_view()),
    path("home/technology", views.TechnologyView.as_view()),
    path("cv/education", views.EducationView.as_view()),
    path("cv/work", views.WorkView.as_view()),
    path("cv/project", views.ProjectView.as_view()),
    path("cv/certification", views.CertificationView.as_view()),
    path("cv/publication", views.PublicationView.as_view()),
    path("cv/reference", views.ReferenceView.as_view()),
    path("cv", views.cv_view),
]
