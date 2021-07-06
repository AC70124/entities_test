FROM nexusprod.corp.intranet:4567/temp_mirror/node:10.16.3-slim
LABEL Description="Base image for node and npm"

ARG user=jenkins
ARG group=jenkins
ARG uid=1341
ARG gid=1341
RUN getent group ${gid} || groupadd -g ${gid} ${group}
RUN useradd -c "Jenkins user" -d /home/${user} -u ${uid} -g ${gid} -m ${user}
RUN usermod -a -G root ${user}

RUN npm config -g set user $(whoami)
WORKDIR /home/node
