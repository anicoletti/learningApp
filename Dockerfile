# Stage 1: Dependency Installation & Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package management files first to maximize Docker layer caching
COPY package.json package-lock.json turbo.json ./
COPY apps/solarSystem/package.json ./apps/solarSystem/

# Install dependencies
# Using npm ci is faster if a lockfile exists, but fallback to install if needed.
RUN npm install

# Copy the rest of the monorepo source code
COPY . .

# Build the project (runs turbo run build, which triggers expo export in the solarSystem app)
RUN npm run build

# Stage 2: Serve the optimized static bundle
FROM nginx:alpine

# Copy the built web assets from the builder stage
# Expo's web export command drops files in the "dist" directory by default
COPY --from=builder /app/apps/solarSystem/dist /usr/share/nginx/html

# Expose port 80 for Coolify's reverse proxy to route traffic to
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
