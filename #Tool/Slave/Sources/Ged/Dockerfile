
FROM node:12.18.2 as builder

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"
WORKDIR /app

ENTRYPOINT rm -rf .env && env > .env && \
         yarn install && yarn build && \
         rm .env && rm -rf ./prod/* && mv ./build/* ./prod


FROM mhart/alpine-node as prod

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"
WORKDIR /app

RUN apk update
RUN apk add curl
RUN yarn global add serve

ENTRYPOINT serve -p 80 -s .
