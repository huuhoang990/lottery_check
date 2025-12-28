#  Dockerfile for Node Express Backend
FROM node:20-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies.
RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
