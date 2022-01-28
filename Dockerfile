FROM pypy:3.8-7-buster as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN python -m pip install -U --no-cache-dir pip setuptools

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/utils.py
RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/response.py

FROM base as dev

WORKDIR /kvd

EXPOSE $PORT

ENTRYPOINT gunicorn kvdomingo.wsgi -b 0.0.0.0:$PORT \
    --workers 2 \
    --threads 4 \
    --log-file - \
    --access-logfile - \
     --access-logformat "%(t)s %(r)s %(s)s %(M)sms" \
    --capture-output \
    --reload

FROM node:16-alpine as build

WORKDIR /web

COPY ./app/ ./

RUN yarn install --prod

RUN yarn build

FROM base as prod

WORKDIR /backend

COPY ./dev/ ./dev/
COPY ./kvdomingo/ ./kvdomingo/
COPY ./photography/ ./photography/
COPY ./svip/ ./svip/
COPY ./web/ ./web/
COPY ./*.py ./
COPY --from=build /web/build ./app/

EXPOSE $PORT

ENTRYPOINT python manage.py collectstatic --noinput && \
    python manage.py migrate && \
    gunicorn kvdomingo.wsgi --workers 1 --threads 2 -b 0.0.0.0:$PORT --log-file -
