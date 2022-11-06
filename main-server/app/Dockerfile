# syntax=docker/dockerfile:1
FROM node:19-alpine
WORKDIR /app
COPY package.json package.json
# install 
RUN npm i
ENTRYPOINT ["node", "src/server.js"]
EXPOSE 3000
