FROM node:18.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["yarn", "start:dev"]