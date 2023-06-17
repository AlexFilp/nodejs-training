FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm isntall

COPY . .

EXPOSE 3030

CMD ["npm", "start"]