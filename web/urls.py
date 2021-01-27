from django.urls import path
from . import views


app_name = 'web'
urlpatterns = [
    path('home/content', views.HomepageContentApi.as_view()),
    path('home/technology', views.TechnologyApi.as_view()),
    path('cv/education', views.EducationApi.as_view()),
    path('cv/work', views.WorkApi.as_view()),
    path('cv/project', views.ProjectApi.as_view()),
    path('cv/certification', views.CertificationApi.as_view()),
    path('cv/publication', views.PublicationApi.as_view()),
    path('cv/reference', views.ReferenceApi.as_view()),
]
