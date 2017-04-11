FROM daocloud.io/node:6.10.0
RUN mkdir -p /www/imgServer/



COPY ./node/imgServer /www/imgServer/

WORKDIR /www/imgServer/

RUN npm install --registry=https://registry.npm.taobao.org
#RUN npm install

CMD ["npm","start"]
