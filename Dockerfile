FROM ubuntu

COPY front-end-react app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y npm

WORKDIR app

RUN npm install
