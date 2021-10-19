### STAGE 1: Build ###
FROM node:12 AS build
ARG yarn_build=build:prod
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn $yarn_build

### STAGE 2: Run ###
FROM nginx:1.21.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
