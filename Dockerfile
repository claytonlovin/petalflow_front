FROM node:22

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200


CMD ["ng", "serve", "--disable-host-check", "--host", "0.0.0.0"]