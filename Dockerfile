# Step 1: Build the Angular app
FROM node:18 as build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all the Angular app files to the container
COPY . .

# Build the Angular project
RUN npm run build --prod

# Step 2: Serve the Angular app with NGINX
FROM nginx:alpine

# Copy the Angular build files to the NGINX HTML directory
COPY --from=build /app/dist/final-frontend /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
