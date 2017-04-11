"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by zhoucaiguang on 2017/3/24.
 */
const koa = require('koa');
const koaRouter = require('koa-router');
const logger = require('koa-logger');
const route_1 = require('./route');
const log4 = require('log4js');
const log4_1 = require('./configs/log4');
const app = new koa();
const bodyParser = require('koa-body');
log4.configure(log4_1.log4Config);
const log = log4.getLogger();
const koaRoute = new koaRouter();
app.use(logger());
app.use(bodyParser());
app.use(koaRoute.routes());
koaRoute.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    yield next();
}));
new route_1.default(koaRoute);
app.listen(3003);
// app.listen(3004);
// app.listen(3005);
console.log('服务开启，端口号:3003');
