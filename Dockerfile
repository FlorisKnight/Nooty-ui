FROM nginx:1.17.1-alpine
COPY /dist/nooty-ui /usr/share/nginx/html
