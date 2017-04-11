/**
 * Created by zhoucaiguang on 2017/3/24.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const routeConfigs_1 = require('./configs/routeConfigs');
class Router {
    constructor(koaRoute) {
        routeConfigs_1.config.map(route => {
            koaRoute[route.method](route.url, route.fn);
        });
    }
    setTimeout(m) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null);
                }, m * 1000);
            });
        });
    }
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // await next();
            // ctx.body = ctx;
            ctx.redirect('/'); //重定向
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
