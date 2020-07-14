FROM node:10.16.3

RUN mkdir -p /home/flashcard/app/node_modules && chown -R node:node /home/flashcard/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/flashcard/app

COPY package*.json ./

USER node

RUN npm install
RUN npm install pm2@latest -g
ENV PM2_PUBLIC_KEY q7wfibk85w9dkra
ENV PM2_SECRET_KEY 8m16335l8cag57b


COPY --chown=node:node . .

EXPOSE 4000

CMD [ "node", "app.js" ]