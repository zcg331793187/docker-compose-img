/**
 * Created by zhoucaiguang on 2017/3/24.
 */
"use strict";
class url {
    static getInstance() {
        if (!url.instance) {
            url.instance = new url();
        }
        return url.instance;
    }
    static index(ctx, next) {
        ctx.body = 'url';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = url;
