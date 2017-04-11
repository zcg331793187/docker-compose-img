FROM daocloud.io/node:6.10.0
RUN mkdir -p /www/loop/



COPY ./node/loop /www/loop/

WORKDIR /www/loop/

#RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install

CMD ["npm","start"]
