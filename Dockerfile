FROM node:16.0.0-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

# production environment
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
