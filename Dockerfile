# Use the official Node.js image with a smaller base
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build the application
COPY . .
RUN pnpm run build

# Use a smaller runtime image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json ./

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
