# Start from the official Node.js 20 image
FROM --platform=linux/amd64 node:18.4.0-alpine

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source inside Docker image
COPY . .

# Build the application
RUN npm run build

# CMD [ "node", "./dist/src/index.js" ]
CMD [ "npm", "run", "prod" ]
# Expose the port the app runs on
EXPOSE 80
