from rest_framework import serializers
from .models import *


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    subject = CourseSerializer()

    class Meta:
        model = BlogPost
        fields = '__all__'
