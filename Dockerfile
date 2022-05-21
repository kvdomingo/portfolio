FROM python:3.10-bullseye as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base as dev

COPY requirements.dev.txt requirements.txt /tmp/

RUN pip install --no-cache-dir -r /tmp/requirements.dev.txt

WORKDIR /kvd

ENTRYPOINT ["gunicorn", "kvdomingo.wsgi", "-b", "0.0.0.0:5000", "-c", "./gunicorn.conf.py", "--reload"]

FROM node:16-alpine as build

WORKDIR /web

COPY ./app/ ./

RUN yarn && yarn build

FROM base as prod

COPY requirements.txt /tmp/

RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /backend

COPY ./dev/ ./dev/
COPY ./kvdomingo/ ./kvdomingo/
COPY ./photography/ ./photography/
COPY ./svip/ ./svip/
COPY ./web/ ./web/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/build ./app/

RUN chmod +x docker-entrypoint.sh

EXPOSE $PORT

ENTRYPOINT ["./docker-entrypoint.sh"]
