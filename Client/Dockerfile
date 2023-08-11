# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
# COPY package.json .
# COPY yarn.lock .

# Copy the rest of the application code
COPY . .
# Install application dependencies using yarn
RUN yarn install



# Expose the port on which your application will run
EXPOSE 5173

# Command to start your application
CMD ["yarn","run", "dev"]
