from django.urls import path, re_path
from . import views


app_name = 'svip'
urlpatterns = [
    re_path('^api/svip/blogpost', views.BlogPostApi.as_view()),
    re_path('^api/svip/course', views.CourseApi.as_view()),
    path('svip', views.index, name='index'),
    path('svip/<slug:subject_slug>', views.subject, name='subject'),
    path('svip/<slug:subject_slug>/<slug:post_slug>/', views.post, name='post'),
]
