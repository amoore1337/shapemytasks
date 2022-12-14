FROM node:16.18-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./app ./app
COPY --chown=node:node ./config ./config
COPY --chown=node:node ./migrations ./migrations
COPY --chown=node:node ./.sequelizerc ./.sequelizerc
COPY --chown=node:node ./apollo.config.js ./apollo.config.js
COPY --chown=node:node ./index.js ./index.js
COPY --chown=node:node ./package*.json ./

USER node

RUN npm install

EXPOSE 3000:3000

CMD ["npm", "run", "prod"]
