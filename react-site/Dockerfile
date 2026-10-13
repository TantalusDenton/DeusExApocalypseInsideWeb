FROM node:22-alpine AS build
WORKDIR /app
COPY react-site/package*.json ./
RUN npm ci
COPY react-site/ ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY react-site/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
USER 101
