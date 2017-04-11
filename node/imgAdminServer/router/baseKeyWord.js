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
const baseKeyWordModel = require('../model/baseKeyWord');
class baseKeyWord {
    static getInstance() {
        if (!baseKeyWord.instance) {
            baseKeyWord.instance = new baseKeyWord();
        }
        return baseKeyWord.instance;
    }
    static index(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = 'baseKeyWord';
        });
    }
    /**
     * 获取
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static getAll(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = yield baseKeyWordModel.getAll();
        });
    }
    static getValidAll(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {
                where: {
                    isUse: 1,
                },
                attributes: ['keyName', 'tips']
            };
            yield next();
            ctx.body = yield baseKeyWordModel.getAll(where);
        });
    }
    /**
     * 传{keyName,tips}
     * 新增
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static addData(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = ctx.request.body;
            let addData = {
                keyName: postData['keyName'],
                tips: postData['tips'],
            };
            ctx.body = yield baseKeyWordModel.add(addData);
        });
    }
    /**
     * 传{id,keyName,tips,isUse,times}
     * 更新数据
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static upDate(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = ctx.request.body;
            let where = { where: {
                    id: postData.id
                } };
            ctx.body = yield baseKeyWordModel.update(postData, where);
        });
    }
    /**
     * 传id
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static deleteDate(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = ctx.request.body;
            let where = { where: {
                    id: postData.id
                } };
            ctx.body = yield baseKeyWordModel.deleteData(where);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = baseKeyWord;
