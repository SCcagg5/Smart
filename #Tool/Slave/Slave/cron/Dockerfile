FROM python:latest AS CRON

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /home/cron
RUN mkdir /home/logs

RUN apt-get update && apt-get install cron -y

RUN pip install --upgrade pip
COPY ./requirements.txt ./
RUN pip install --upgrade -r requirements.txt

COPY ./init.sh ./
COPY ./task ./

ENTRYPOINT /bin/bash ./init.sh
