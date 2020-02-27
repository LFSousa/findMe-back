FROM node:12

WORKDIR /var/www

COPY package*.json /var/www/

RUN npm install

COPY . /var/www

EXPOSE 3000

CMD [ "node", "start", "index.js" ]