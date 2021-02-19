FROM node:14.15-alpine AS build

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

# RUN apt-get update && apt-get -y install nginx

COPY --chown=node:node ./package*.json /app/

USER node
RUN npm ci

COPY --chown=node:node . /app/

RUN npm run build

FROM nginx:1.19-alpine
WORKDIR /app

COPY --from=build /app/build /app/build
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3030:3030
