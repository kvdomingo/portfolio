FROM node:16-alpine as web

WORKDIR /kvd

EXPOSE 3000

ENTRYPOINT [ "sh", "devserver.sh" ]

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

ENTRYPOINT uvicorn kvdomingo.asgi:application --host 0.0.0.0 --port $PORT --reload --reload-exclude node_modules/

FROM node:16-alpine as web-build

WORKDIR /frontend

COPY ./app/ ./

RUN yarn install

RUN yarn build

FROM base as prod

WORKDIR /backend

COPY ./dev/ ./dev/
COPY ./kvdomingo/ ./kvdomingo/
COPY ./photography/ ./photography/
COPY ./svip/ ./svip/
COPY ./web/ ./web/
COPY ./*.py ./
COPY runserver.sh .
COPY --from=web-build /frontend/build ./app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
