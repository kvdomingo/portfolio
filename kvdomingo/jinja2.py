from django.templatetags.static import static
from django.urls import reverse
from django.conf import settings
from django_seo_js.templatetags.django_seo_js import seo_js_head
from webpack_loader.templatetags.webpack_loader import render_bundle
from jinja2 import Environment
from datetime import datetime


def environment(**options):
    env = Environment(**options)
    env.globals.update(dict(
        now=datetime.now(),
        render_bundle=render_bundle,
        seo_js_head=seo_js_head,
        settings=settings,
        static=static,
        url=reverse,
        zip=zip,
    ))
    return env
