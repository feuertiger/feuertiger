FROM node:10.19.0-buster

# Install sudo && curl
RUN apt-get update \
    && apt-get -y install sudo \
    && sudo apt upgrade -y \
    && sudo apt install -y curl

# Install postgres
RUN sudo apt-get install -y postgresql postgresql-contrib \
    && update-rc.d postgresql enable
USER postgres
RUN /etc/init.d/postgresql start \
    && psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" \
    && createdb -O feuertiger feuertiger
USER root

# Install lerna && firebase cli
RUN npm i -g lerna \
    && npm i -g firebase-tools
