FROM node:16-alpine as build

WORKDIR /web

COPY ./app/ ./

RUN yarn install && yarn build

FROM python:3.10-bullseye

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PIP_DEFAULT_TIMEOUT 100
ENV POETRY_VERSION 1.3.2
ENV VERSION $VERSION
ARG PORT

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /tmp

COPY ./api/poetry.lock ./api/pyproject.toml ./

RUN poetry export --without-hashes -f requirements.txt | pip install -r /dev/stdin

WORKDIR /backend

COPY ./api/ ./
COPY --from=build /web/dist ./html/

ENTRYPOINT [ "./docker-entrypoint.sh" ]
