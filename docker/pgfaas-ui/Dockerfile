#
# Adapted from OpenFaas node8-express-template
#

FROM node:8.11.3-alpine

ENV PGFAAS_GIT_TAG "develop"

RUN addgroup -S app && adduser -S -g app app
RUN apk update
RUN apk add git curl vim yarn

RUN mkdir -p /home/app
WORKDIR /home/app

RUN git clone https://github.com/AURIN/pgFaas-ui.git
WORKDIR /home/app/pgFaas-ui
RUN git checkout ${PGFAAS_GIT_TAG}
RUN npm install
RUN yarn run build-dev
COPY *.* ./
RUN chmod a+x *.sh
RUN chmod a+w /var/log
USER app
CMD ["./startup.sh"]

