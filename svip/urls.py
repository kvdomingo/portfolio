from django.urls import path
from . import views


app_name = 'svip'
urlpatterns = [
    path('svip', views.index, name='index'),
    path('svip/<slug:subject_slug>', views.subject, name='subject'),
    path('svip/<slug:subject_slug>/<slug:post_slug>/', views.post, name='post'),
]
