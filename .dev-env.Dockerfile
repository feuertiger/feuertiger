FROM node:10.19.0-buster

# Install sudo && curl && cypress dependencies
RUN apt-get update \
    && apt-get -y install sudo \
    && sudo apt upgrade -y \
    && sudo apt install -y curl \
    && sudo apt install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    && sudo apt install -y chromium

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

# Increase nodejs memory
RUN export NODE_OPTIONS="--max-old-space-size=4096"
