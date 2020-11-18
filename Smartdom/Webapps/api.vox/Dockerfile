FROM ubuntu:18.04
  
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
 apt-get -y upgrade && \
 apt-get -y dist-upgrade && \
 apt-get -y autoremove

RUN apt-get install -y python-dev python-tk python-numpy python3-dev python3-tk python3-numpy libpoppler-cpp-dev libpython3-all-dev python3-pip libpython3-all-dev python3-all && \
 apt-get install -y libzbar0 && \
 apt install -y poppler-utils && pip3 install --upgrade pip

COPY ./requirements.txt ./
RUN pip3 install --upgrade -r requirements.txt

WORKDIR /home/api

ENTRYPOINT python3 server.py;
