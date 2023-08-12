FROM node:18-alpine
#Dockerfile for dev.
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

EXPOSE 3005

# Start the development server
CMD ["npm", "run", "dev"]
