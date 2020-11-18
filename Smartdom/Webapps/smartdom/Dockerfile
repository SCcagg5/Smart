FROM mhart/alpine-node

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /app
RUN yarn global add serve

CMD ["serve", "-p", "80", "-s", "."]
