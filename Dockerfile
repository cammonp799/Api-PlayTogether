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

# Question 3: Using the following command: docker run -d --name mysql-container1
# -e MYSQL_ROOT_PASSWORD=root
# -e MYSQL_DATABASE=playTogetherApi
# -e MYSQL_USER=user
# -e MYSQL_PASSWORD=root
# -p 3306:3306
# mysql:8.0.
# Once launched, I received the ID confirming the start of my container.
# Id = cca2fedeb9f8249a5fc69a33303ad47866a47e8ad0fb9f88135c131cc0ae20"