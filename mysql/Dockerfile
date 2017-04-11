FROM mysql:5.7

RUN mkdir -p /backup/

COPY ./mysql/backup.sh /backup/backup.sh

WORKDIR /backup/

RUN chmod u+x backup.sh