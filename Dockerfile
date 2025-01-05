# Use the official Node.js image from the Docker Hub
FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
