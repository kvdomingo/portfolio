FROM node:16-alpine as build

WORKDIR /web/app

COPY ./app/ ./

RUN yarn install

RUN yarn build

FROM python:3.9.7-alpine as prod

RUN apk add --no-cache --update postgresql-dev musl-dev gcc

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /backend

COPY ./dev/ ./dev/
COPY ./kvdomingo/ ./kvdomingo/
COPY ./photography/ ./photography/
COPY ./svip/ ./svip/
COPY ./web/ ./web/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/app/build ./app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
