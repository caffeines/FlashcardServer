FROM node:10.16.3

RUN mkdir -p /home/flashcard/app/node_modules && chown -R node:node /home/flashcard/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/flashcard/app

COPY package*.json ./

USER node

RUN npm install
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY vc6u8s82ibxx7si
ENV PM2_SECRET_KEY aiw3uf8dcko2nun
ENV NODE_MAILER_PASSWORD FakePass

COPY --chown=node:node . .

EXPOSE 3141

CMD ["pm2-runtime", "process.yml"]