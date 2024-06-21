FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./dist ./dist

# 新西兰时区
ENV TZ Pacific/Auckland 

EXPOSE 5000

CMD [ "node", "./dist/main" ]
