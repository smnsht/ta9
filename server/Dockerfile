FROM node:alpine

WORKDIR /usr/src/app/server

COPY ./*.json ./

RUN npm install -g json-server 

EXPOSE 3000

ENTRYPOINT ["json-server",  "--host", "0.0.0.0", "--port", "3000",  "noir_db.json"]
