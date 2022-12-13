FROM node:lts-hydrogen

ENV NODE_ENV=production

RUN MKDIR -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./

USER node

RUN npm install --omit=dev

COPY --chown=node:node . .

CMD ["npm","run","start"]
