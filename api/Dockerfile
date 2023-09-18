FROM python:3.10 AS base

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PIP_DEFAULT_TIMEOUT 100

ARG POETRY_VERSION=1.6.1

FROM base AS deps

RUN pip install "poetry==$POETRY_VERSION" && \
    poetry config virtualenvs.create false

WORKDIR /tmp

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-interaction --no-ansi

FROM deps AS dev

WORKDIR /backend

CMD [ "gunicorn", "--bind", "unix:/tmp/gunicorn/gunicorn.sock", "--config", "gunicorn.conf.py", "--reload" ]
