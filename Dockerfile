FROM node:alpine
WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json .
RUN npm ci
COPY . .

CMD ["npm", "start"]