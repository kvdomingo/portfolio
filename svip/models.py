from django.db import models
from django.utils import timezone
from tinymce import models as mcemodels


def set_time_aware(d):
    return d.astimezone(settings.LOCAL_TZ)

STATUS = (
    (0, 'Draft'),
    (1, 'Published'),
)

SUBJECT = (
    (0, None),
    (186, 'Applied Physics 186'),
    (187, 'Applied Physics 187'),
)

class BlogPost(models.Model):
    created = models.DateTimeField(default=set_time_aware)
    modified = models.DateTimeField(auto_now=True)
    subject = models.IntegerField(choices=SUBJECT, default=0)
    title = models.CharField(max_length=256, unique=True)
    slug = models.SlugField(max_length=256, unique=True)
    body = mcemodels.HTMLField()
    cover = models.URLField(blank=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'({self.modified}) {self.subject}: {self.title}'
