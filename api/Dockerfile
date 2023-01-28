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

RUN pip install "poetry==$POETRY_VERSION" && poetry config virtualenvs.create false

WORKDIR /tmp

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-interaction --no-ansi

WORKDIR /backend

ENTRYPOINT [ "gunicorn", "--bind", "0.0.0.0:5000", "--config", "gunicorn.conf.py", "--reload" ]
