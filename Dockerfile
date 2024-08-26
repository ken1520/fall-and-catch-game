# Use the official Node 18.16 image as the base image
FROM node:18.16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]