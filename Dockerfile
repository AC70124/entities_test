FROM node:10.16.3-slim

ARG GH_TOKEN
ENV GH_TOKEN=${GH_TOKEN}

RUN npm install @vue/cli --global

RUN mkdir -p /po-adaptive-network
RUN chmod a+rwx /po-adaptive-network

COPY .npmrc /tmp
COPY package.json /tmp
RUN cd /tmp && npm install

WORKDIR /po-adaptive-network

EXPOSE 9090
