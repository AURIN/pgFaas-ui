#
# Adapted from OpenFaas node8-express-template
#

FROM node:8.11.4

ENV PGFAAS_GIT_TAG "0.1.0"

#RUN addgroup -S app && adduser -S -g app app
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
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
RUN chmod a+w /var/log
CMD ["./startup.sh"]

