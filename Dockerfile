FROM python:3.10-bullseye as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PIP_DEFAULT_TIMEOUT 100
ENV POETRY_VERSION 1.1.13
ENV VERSION $VERSION
ARG PORT

FROM base as dev

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /kvd

COPY poetry.lock pyproject.toml gunicorn.conf.py ./

RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

ENV VERSION $VERSION

ENTRYPOINT [ "gunicorn", "kvdomingo.wsgi", "-b", "0.0.0.0:5000", "-c", "./gunicorn.conf.py", "--reload" ]

FROM node:16-alpine as build

WORKDIR /web

COPY ./webapp/ ./

RUN yarn install && yarn build

FROM base as prod

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /tmp

COPY poetry.lock pyproject.toml ./

RUN poetry export --without-hashes -f requirements.txt | pip install -r /dev/stdin

WORKDIR /backend

COPY ./dev/ ./dev/
COPY ./kvdomingo/ ./kvdomingo/
COPY ./photography/ ./photography/
COPY ./svip/ ./svip/
COPY ./web/ ./web/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/build ./webapp/

RUN chmod +x docker-entrypoint.sh

EXPOSE $PORT

ENTRYPOINT [ "./docker-entrypoint.sh" ]
