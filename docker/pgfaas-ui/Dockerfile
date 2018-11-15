#
# Adapted from OpenFaas node8-express-template
#

FROM node:8.11.4

ENV PGFAAS_GIT_TAG "v0.1.1"

RUN apt-get update
RUN apt-get install -y git curl vim gcc cmake libpng-dev

RUN mkdir -p /home/app
WORKDIR /home/app

RUN git clone https://github.com/AURIN/pgFaas-ui.git
WORKDIR /home/app/pgFaas-ui
RUN git checkout ${PGFAAS_GIT_TAG}
RUN yarn install
COPY *.* ./
RUN chmod a+x *.sh
CMD ["./startup.sh"]

