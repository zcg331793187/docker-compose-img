FROM daocloud.io/node:6
RUN mkdir -p /www/backup/



COPY ./node/backup /www/backup/

WORKDIR /www/backup/

RUN npm install --registry=https://registry.npm.taobao.org
#RUN npm install

CMD ["npm","start"]