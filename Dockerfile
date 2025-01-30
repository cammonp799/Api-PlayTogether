# Node.js 23
FROM node:23.5.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies (from `/app`)
RUN npm install

# Copy the rest of the files (to `/app`)
COPY . .

# Expose the port on which the app runs
EXPOSE 4000

# Start the application
CMD ["node", "app.cjs"]
