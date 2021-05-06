FROM node:12.18.2 as prod   

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"
WORKDIR /api

ENTRYPOINT  rm -rf .env && env > .env && yarn install && yarn start
