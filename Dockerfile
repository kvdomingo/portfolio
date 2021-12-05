FROM pypy:3.8-7-buster as base

RUN python -m pip install -U --no-cache-dir pip setuptools

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/utils.py
RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/response.py

FROM base as dev

WORKDIR /backend

EXPOSE $PORT

ENTRYPOINT uvicorn kvdomingo.asgi:application --workers 4 --host 0.0.0.0 --port $PORT --reload

FROM node:16-alpine as web-build

WORKDIR /web/app

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
COPY ./*.sh ./
COPY --from=web-build /web/app/build ./app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
