FROM node

RUN apt-get update
RUN apt-get install -y nginx
COPY . .

ENTRYPOINT nginx && node index.js