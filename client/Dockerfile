# Stage 1: Build the app using Node.js
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (to take advantage of Docker's caching mechanism)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built files from the builder stage to Nginx's default folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
