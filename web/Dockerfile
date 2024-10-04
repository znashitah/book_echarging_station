# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install UI5 Tooling globally
RUN npm install --global @ui5/cli

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8081 for the frontend server
EXPOSE 8081

# Start the application using the start script defined in package.json
CMD ["npm", "run", "start"]
#ENTRYPOINT ["npm", "run", "start"]



#docker tag local-image:tagname new-repo:tagname
#docker push new-repo:tagname
