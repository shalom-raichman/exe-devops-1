FROM node:16-alpine

WORKDIR /app

COPY . /app/

RUN npm install

RUN npx tsc

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]