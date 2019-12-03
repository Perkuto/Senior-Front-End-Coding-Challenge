FROM node:12.13.1-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.6-alpine

COPY --from=node /usr/src/app/dist/Senior-Front-End-Coding-Challenge /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
