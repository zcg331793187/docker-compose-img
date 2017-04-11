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
const adminModel = require('../model/admin');
const crypto = require('crypto');
// var crypto = require('crypto');  //加载crypto库
// console.log(crypto.getHashes()); //打印支持的hash算法
class admin {
    static index(ctx, next) {
        ctx.session.userInfo = ctx.session.userInfo || null;
        console.log('是否登陆：', ctx.session.userInfo);
        if (!ctx.session.userInfo) {
            console.log('未登录');
        }
        // console.log( ctx.session.userInfo);
        // console.log(ctx.session.count);
        ctx.body = ctx.session.userInfo;
    }
    static loginOut(ctx, next) {
        ctx.session.userInfo = {};
        ctx.body = ctx.session.userInfo;
    }
    static login(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = JSON.parse(ctx.request.body);
            let content = postData['password']; //加密的明文；
            let sha1 = crypto.createHash('sha1'); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
            let md5 = crypto.createHash('md5');
            sha1.update(content);
            md5.update(ctx.request.body);
            let where = { where: {
                    userName: postData['userName'],
                    passWord: sha1.digest('hex')
                } };
            let isLogin = yield adminModel.getOne(where);
            if (isLogin) {
                postData['token'] = md5.digest('hex');
                ctx.body = postData;
            }
            else {
                ctx.body = postData;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = admin;
