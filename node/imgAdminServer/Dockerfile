FROM daocloud.io/node:6.10.0
RUN mkdir -p /www/imgAdminServer/



COPY ./node/imgAdminServer /www/imgAdminServer/

WORKDIR /www/imgAdminServer/

#RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install

CMD ["npm","start"]
