FROM nginx
LABEL maintainer="huwl@suancloud.cn"

RUN rm -rf /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
