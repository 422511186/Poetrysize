FROM nginx
COPY ./dist/  /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
