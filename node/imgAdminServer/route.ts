/**
 * Created by zhoucaiguang on 2017/3/24.
 */

import {config} from './configs/routeConfigs';
export  default class Router {


    constructor(koaRoute) {




        config.map(route => {



            koaRoute[route.method](route.url, route.fn);

        });
    }


 public   async setTimeout(m: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, m * 1000);
        });
    }


    public   async index(ctx) {

        // await next();
        // ctx.body = ctx;


        ctx.redirect('/');//重定向

    }


}




