FROM oven/bun:1.0 AS build

WORKDIR /web

COPY ./ui/ ./

RUN yarn install && yarn build

FROM python:3.10 AS deps

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PIP_DEFAULT_TIMEOUT 100
ENV VERSION $VERSION

ARG POETRY_VERSION=1.6.1
ARG PORT

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /tmp

COPY ./api/poetry.lock ./api/pyproject.toml ./

RUN poetry export --without-hashes -f requirements.txt | pip install -r /dev/stdin

FROM deps AS prod

WORKDIR /backend

COPY ./api/ ./
COPY --from=build /web/dist/ ./html/

ENTRYPOINT [ "./docker-entrypoint.sh" ]
