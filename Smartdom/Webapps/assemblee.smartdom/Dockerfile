FROM node:12.18.2 AS builder_assemble

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /app
COPY ./ ./

RUN yarn install
RUN yarn build


FROM mhart/alpine-node

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /app
RUN yarn global add serve

COPY --from=builder_assemble /app/build .

CMD ["serve", "-p", "80", "-s", "."]
