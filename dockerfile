# Base image
FROM node:14

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
#COPY . .
COPY ./src ./src

# Set environment variables
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=rootroot
ENV DB_NAME=WALLET

# Expose port
EXPOSE 3000

# Run the application
CMD [ "node", "src/app.js" ]
