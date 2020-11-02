FROM debian:latest

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"

WORKDIR /home/api

RUN apt-get update -y
RUN apt-get install build-essential libpoppler-cpp-dev pkg-config python3-dev -y
RUN apt-get install python3-pip -y

COPY ./requirements.txt ./
RUN pip3 install --upgrade -r requirements.txt

ENTRYPOINT python3 server.py;
