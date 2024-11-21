FROM node:18-alpine AS builder

RUN apk --no-cache --update --virtual build-dependencies add python3 make g++

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate --dotenv .env.deploy

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /frontend/.output/public /usr/share/nginx/html