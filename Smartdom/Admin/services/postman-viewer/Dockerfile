FROM node:14-alpine AS POSTMANVIEWER

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /home/frontend

COPY ./package.json       ./package.json
RUN npm install

COPY ./* ./
COPY ./src/               ./src/
COPY ./public/            ./public/
RUN npm run build;
RUN ls
CMD ["node", "server.js"]
