FROM node:alpine

WORKDIR /usr/src/app/client

COPY . ./

RUN npm ci

EXPOSE 4200

CMD ["npm", "run", "start-docker"]