from tinymce import HTMLField
from datetime import datetime
from django.db import models
from django.utils import timezone
from django.conf import settings


def set_aware_time():
    return datetime.now().astimezone(settings.LOCAL_TZ)

STATUS = (
    (0, 'Draft'),
    (1, 'Published'),
)

class BlogPost(models.Model):
    created = models.DateTimeField(default=set_aware_time)
    modified = models.DateTimeField(auto_now=True)
    subject = models.ForeignKey(
        'Course',
        on_delete=models.CASCADE,
        to_field='number',
        related_name='posts',
    )
    title = models.CharField(max_length=256, unique=True)
    slug = models.SlugField(max_length=256, unique=True)
    body = HTMLField('Body')
    keywords = models.TextField(max_length=256, blank=True)
    cover = models.URLField(blank=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created']

    def get_absolute_url(self):
        return f'/svip/{self.subject.slug}/{self.slug}/'

    def __str__(self):
        return f'{self.subject}: {self.title}'


class Course(models.Model):
    name = models.CharField(max_length=256)
    number = models.IntegerField(unique=True)
    slug = models.SlugField(max_length=256, unique=True)
    title = models.CharField(max_length=256)
    description = models.TextField()
    cover = models.URLField(blank=True)

    def __str__(self):
        return f'{self.name}'
