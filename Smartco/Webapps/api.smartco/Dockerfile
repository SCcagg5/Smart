FROM debian:latest

LABEL maintainer="Courtel Eliot"
LABEL maintainermail="eliot.courtel@wanadoo.fr"
WORKDIR /home/api

RUN apt-get update -y
RUN apt install build-essential libpoppler-cpp-dev pkg-config python3-dev -y
RUN apt install python3-pip -y
RUN pip3 install pdftotext

RUN apt-get install tesseract-ocr -y
RUN apt-get install libtesseract-dev -y
RUN pip3 install pytesseract

COPY ./requirements.txt ./
RUN pip3 install -r requirements.txt

ENTRYPOINT python3 server.py;
