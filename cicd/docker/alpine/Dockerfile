FROM nexusprod.corp.intranet:4567/temp_mirror/alpine:3.12.1
LABEL Description="Base image for bash scripting"

ARG user=jenkins
ARG group=jenkins
ARG uid=1341
RUN adduser --home /home/${user} --uid ${uid} --disabled-password --shell /bin/sh ${user} ${group}
WORKDIR /home/node

RUN apk update && \
    apk add curl git openssh
