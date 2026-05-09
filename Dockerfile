# Use Node.js
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY server .

# Expose port
EXPOSE 8080

# Start app
CMD ["npm", "start"]