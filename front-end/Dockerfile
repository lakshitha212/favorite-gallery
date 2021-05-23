FROM node:current-slim

LABEL version="1.0"
LABEL description="Docker image for the Favorite Gallery frontend react app."
LABEL maintainer = ["chameera.lakshitha212@gmail.com"]

WORKDIR /usr/src/app

ENV PATH ./node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3000

COPY . ./

Run npm run build

CMD [ "npm", "start" ]

