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
const configModel = require('../model/configs');
class configs {
    static getValidAll(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {
                attributes: ['id', 'webName', 'isUse']
            };
            ctx.body = yield configModel.getAll(where);
        });
    }
    static addConfig(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = JSON.parse(ctx.request.body);
            let addData = {
                webName: postData.webName,
                config: JSON.stringify(postData.config)
            };
            ctx.body = yield configModel.add(addData);
        });
    }
    static settingIsUse(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = JSON.parse(ctx.request.body);
            let UpdateData = {
                isUse: postData.isUse
            };
            let where = {
                where: {
                    id: postData.id
                }
            };
            ctx.body = yield configModel.update(where, UpdateData);
        });
    }
    static searchWebName(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let where = {
                where: {
                    isUse: 1,
                    webName: { like: '%' + arg.webName + '%' }
                },
                attributes: ['id', 'webName', 'isUse']
            };
            ctx.body = yield configModel.getAll(where);
        });
    }
    static configDetail(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let where = {
                where: {
                    id: arg.id
                },
                attributes: ['id', 'webName', 'config']
            };
            ctx.body = yield configModel.getOne(where);
        });
    }
    static updateConfig(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = JSON.parse(ctx.request.body);
            let where = {
                where: { id: postData.id
                }
            };
            let editData = {
                webName: postData.webName,
                config: JSON.stringify(postData.config)
            };
            console.log(editData);
            ctx.body = yield configModel.update(where, editData);
        });
    }
    static deleteConfig(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let where = {
                where: {
                    id: arg.id
                }
            };
            ctx.body = yield configModel.deleteData(where);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configs;
