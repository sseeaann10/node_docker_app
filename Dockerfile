FROM node:18.16.0-alpine3.17
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY app.js .
COPY books.js .
COPY server.js .
COPY index.html .
COPY style.css .
RUN npm install
ENTRYPOINT ["node", "server.js"]
EXPOSE 3000

