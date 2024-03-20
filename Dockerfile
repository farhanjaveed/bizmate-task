FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/index.html

RUN rm -rf /usr/share/nginx/html/50x.html

COPY . .