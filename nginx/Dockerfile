FROM nginx:1.11
ENV TZ=Asia/Shanghai
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/configs /etc/nginx/conf.d/configs/
COPY ./nginx/site /www
