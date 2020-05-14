FROM node:10.19.0-buster

# Install sudo && curl
RUN apt-get update \
    && apt-get -y install sudo \
    && sudo apt upgrade -y \
    && sudo apt install -y curl

# Install lerna && firebase cli
RUN npm i -g lerna \
    && npm i -g firebase-tools