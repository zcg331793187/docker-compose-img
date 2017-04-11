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
const titleModel = require('../model/title');
const imgModel = require('../model/img');
class title {
    static index(ctx, next) {
        ctx.body = 'title';
    }
    static getAllTitle(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let offset = Number(arg['limit']);
            if (!offset) {
                offset = 0;
            }
            let where = {
                'attributes': ['id', 'title', 'imgThums', 'status', 'total'], 'limit': 18,
                offset: offset,
            };
            ctx.body = yield titleModel.getAll(where);
        });
    }
    static getTitleDetail(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let titleId = Number(arg['id']);
            let where = {
                where: { titleId },
                'attributes': ['id', 'url']
            };
            ctx.body = yield imgModel.getAll(where);
        });
    }
    static searchTitle(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let title = String(arg['title']);
            let where = {
                where: { title: { like: '%' + title + '%' }
                },
                'attributes': ['id', 'title', 'imgThums', 'status', 'total']
            };
            ctx.body = yield titleModel.getAll(where);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = title;
