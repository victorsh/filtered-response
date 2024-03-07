# Start from the official Node.js 20 image
FROM --platform=linux/amd64 node:21-alpine

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 80
