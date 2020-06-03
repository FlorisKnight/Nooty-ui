
# stage 1

FROM node:alpine AS nooty-ui
WORKDIR /app
COPY . .
RUN npm install && npm run build

# stage 2

FROM nginx:alpine
COPY --from=nooty-ui /app/dist/nooty-ui /usr/share/nginx/html
EXPOSE 80
