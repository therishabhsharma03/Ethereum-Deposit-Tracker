# Step 1: Use a base Node.js image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the entire project to the working directory
COPY . .

# Step 5: Expose the port the app runs on
EXPOSE 5000

# Step 6: Run the app
CMD ["node", "app.js"]