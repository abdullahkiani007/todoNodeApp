# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy backend code
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ .

# Expose the backend port (adjust if different)
EXPOSE 3000

# Run the backend
CMD ["npm", "start"]
