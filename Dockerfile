# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) first to leverage Docker cache
# This means if only your code changes, but dependencies don't, npm install won't run again
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
# The .dockerignore file can be used to exclude files/folders like node_modules, .git, etc.
COPY . .

# Build the TypeScript project (assuming your tsconfig.json outputs to 'dist')
# This will run 'npm run build' which should compile your TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
# (Make sure this matches the PORT you configure in your server.ts, e.g., process.env.PORT || 3000)
EXPOSE 3000

# Define the command to run your app
# Assuming your 'build' script outputs to 'dist/index.js' and that's your entry point
CMD ["node", "dist/index.js"]