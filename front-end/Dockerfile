FROM node:current-slim

WORKDIR /usr/src/app

ENV PATH ./node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3000

COPY . ./

Run npm run build

CMD [ "npm", "start" ]

