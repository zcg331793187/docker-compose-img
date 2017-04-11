/**
 * Created by zhoucaiguang on 2017/3/24.
 */
"use strict";
class login {
    static getInstance() {
        if (!login.instance) {
            login.instance = new login();
        }
        return login.instance;
    }
    static index(ctx, next) {
        ctx.body = 'login';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = login;
