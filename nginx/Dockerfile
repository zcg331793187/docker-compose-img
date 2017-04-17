FROM nginx:1.11
ENV TZ=Asia/Shanghai
COPY ./nginx/default.conf /etc/nginx/nginx.conf
COPY ./nginx/configs /etc/nginx/conf.d/configs/
COPY ./nginx/site /www
