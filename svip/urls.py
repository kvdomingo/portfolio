from django.urls import path
from . import views


app_name = 'svip'
urlpatterns = [
    path('blogpost', views.BlogPostApi.as_view()),
    path('course', views.CourseApi.as_view()),
]
