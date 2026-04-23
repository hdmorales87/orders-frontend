# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build app
COPY . ./
RUN npm run build -- --configuration production

# Production stage
FROM nginx:stable-alpine AS production

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist/orders-frontend/browser /usr/share/nginx/html

# Copy config template
COPY public/config.json.template /usr/share/nginx/html/config.json.template

# Create entrypoint script for environment variable substitution
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'envsubst < /usr/share/nginx/html/config.json.template > /usr/share/nginx/html/config.json' >> /entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
