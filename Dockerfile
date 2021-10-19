### STAGE 1: Build ###
FROM node:10 AS build
ARG npm_build_command=build:prod
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm run $npm_build_command

### STAGE 2: Run ###
FROM nginx:1.21.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
