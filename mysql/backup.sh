#!/bin/bash

mysqldump -u$DB_USER -p$MYSQL_ROOT_PASSWORD --all-databases | gzip > /backup/DatabaseName_$(date +%Y%m%d_%H%M%S).sql.gz
