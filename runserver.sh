#!/bin/sh

python manage.py collectstatic --noinput
python manage.py migrate
gunicorn kvdomingo.asgi:application -b 0.0.0.0:$PORT -k uvicorn.workers.UvicornH11Worker --log-file -
