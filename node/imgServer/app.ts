/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as koa from 'koa';
import * as koaRouter from 'koa-router';
import * as logger from 'koa-logger';

import  Router from './route';
import * as log4 from 'log4js';
import {log4Config} from './configs/log4';

const app = new koa();




const bodyParser =  require('koa-body');
log4.configure(log4Config);
const log = log4.getLogger();
const koaRoute = new koaRouter();













app.use(logger());
app.use(bodyParser());




app.use(koaRoute.routes());




koaRoute.use(async (ctx,next)=> {



    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Content-Type", "application/json;charset=utf-8");
   await next();

});




new Router(koaRoute);











app.listen(3003);
// app.listen(3004);
// app.listen(3005);
console.log('服务开启，端口号:3003');