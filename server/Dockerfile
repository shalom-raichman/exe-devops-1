FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (to take advantage of Docker's caching mechanism)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "npm", "start" ]