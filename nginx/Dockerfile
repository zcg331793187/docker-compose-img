FROM nginx:1.11
ENV TZ=Asia/Shanghai
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/configs /etc/nginx/conf.d/configs/
COPY ./nginx/site /www
