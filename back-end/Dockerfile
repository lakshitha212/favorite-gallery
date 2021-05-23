FROM node:current-slim

LABEL version="1.0"
LABEL description="Docker image for the Favorite Gallery backend node app."
LABEL maintainer = ["chameera.lakshitha212@gmail.com"]

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3002

COPY . ./

CMD [ "npm", "start" ]

