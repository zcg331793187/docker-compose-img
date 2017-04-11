/**
 * Created by zhoucaiguang on 2017/3/24.
 */
"use strict";
exports.dbConfigs = {
    server: process.env.DB_HOST ? process.env.DB_HOST : '127.0.0.1',
    user: process.env.DB_USER ? process.env.DB_USER : 'root',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root',
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? process.env.DB_PORT : '3306',
    maxSockets: 10,
    timeout: 1,
    DB_PREFIX: 'node'
};
