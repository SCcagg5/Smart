FROM debian:10.4 AS QUINSACSMARTDOM

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /home/frontend

RUN apt-get update && apt install curl gnupg -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn -y

COPY ./yarn.lock          ./yarn.lock
COPY ./package.json       ./package.json
RUN yarn install

COPY ./src/               ./src/
COPY ./.idea/             ./.idea/
COPY ./public/            ./public/
RUN yarn build

RUN yarn global add serve
CMD [ "serve", "build" ]
