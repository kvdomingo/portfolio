import os
from datetime import timedelta
from pathlib import Path
from urllib.parse import unquote

import cloudinary
import dj_database_url
import pytz
from django.core.management.utils import get_random_secret_key
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/
PYTHON_ENV = os.environ.get("PYTHON_ENV", "production")

IN_PRODUCTION = PYTHON_ENV == "production"

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY", default=get_random_secret_key())

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = not IN_PRODUCTION

DEBUG_PROPAGATE_EXCEPTIONS = True

if IN_PRODUCTION:
    ALLOWED_HOSTS = ["kvdomingo.xyz"]
else:
    ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    "web.apps.WebConfig",
    "photography.apps.PhotographyConfig",
    "svip.apps.SvipConfig",
    "dev.apps.DevConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.sitemaps",
    "django.contrib.staticfiles",
    "corsheaders",
    "django_filters",
    "ordered_model",
    "rest_framework",
    "tinymce",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "kvdomingo.urls"

CORS_ORIGIN_ALLOW_ALL = not IN_PRODUCTION

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/(?:www.)?kvdomingo\.(xyz|dev)$",
]

CSRF_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = ["https://kvdomingo.xyz", "https://kvdomingo.dev"]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "html"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "kvdomingo.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

if IN_PRODUCTION:
    DATABASE_URL = os.environ.get("DATABASE_URL")
    DATABASE_CONFIG = dj_database_url.parse(DATABASE_URL)
    DATABASE_CONFIG["HOST"] = unquote(DATABASE_CONFIG["HOST"])
else:
    DATABASE_CONFIG = dj_database_url.config()

DATABASES = {"default": DATABASE_CONFIG}


# Cache

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "TIMEOUT": timedelta(hours=1).seconds,
    }
}


# Rest API

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
        "djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "djangorestframework_camel_case.parser.CamelCaseFormParser",
        "djangorestframework_camel_case.parser.CamelCaseMultiPartParser",
        "djangorestframework_camel_case.parser.CamelCaseJSONParser",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}

if not DEBUG:
    REST_FRAMEWORK.update(
        {
            "DEFAULT_RENDERER_CLASSES": [
                "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
                "rest_framework.renderers.JSONRenderer",
            ]
        }
    )

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Manila"

LOCAL_TZ = pytz.timezone(TIME_ZONE)

USE_I18N = True

USE_L10N = True

USE_TZ = True

# TinyMCE config

TINYMCE_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.2.0/tinymce.min.js"

TINYMCE_COMPRESSOR = False

TINYMCE_DEFAULT_CONFIG = {
    "cleanup_on_startup": False,
    "theme": "silver",
    "selector": "textarea",
    "plugins": """
        link image preview codesample table code lists
    """,
    "toolbar": """
        formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist |
        outdent indent table | link image | codesample | preview code
    """,
    "toolbar_mode": "wrap",
    "contextmenu": "formats | link image",
    "menubar": False,
    "inline": False,
    "indentation": "20pt",
    "keep_styles": True,
    "statusbar": True,
    "width": "auto",
    "height": 500,
    "valid_elements": "*[*]",
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/assets/"

STATIC_ROOT = BASE_DIR / "html"

STATICFILES_DIRS = [
    BASE_DIR / "html" / "static",
    BASE_DIR / "html" / "assets",
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

ASSET_DIR = os.environ.get("CLOUDINARY_ASSETS_LOCATION")

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
