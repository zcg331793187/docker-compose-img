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
const imgModel = require('../model/img');
class img {
    static getInstance() {
        if (!img.instance) {
            img.instance = new img();
        }
        return img.instance;
    }
    static index(ctx, next) {
        ctx.body = {};
    }
    static getAll(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = yield imgModel.getAll();
        });
    }
    static getTitleIdImg(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let getData = ctx.request.body;
            let wheres = {
                where: {
                    titleId: getData.titleId
                }
            };
            ctx.body = yield imgModel.getAll(wheres);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = img;
