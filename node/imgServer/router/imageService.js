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
 * Created by zhoucaiguang on 2017/3/27.
 */
const imageServiceModel = require('../model/imageServiceModel');
const reqModel_1 = require('../model/reqModel');
// const images = require("images");
class imageService {
    static getInstance() {
        if (!imageService.instance) {
            imageService.instance = new imageService();
        }
        return imageService.instance;
    }
    static getimgTitles(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let limit = Number(arg.limit);
            let where;
            if (!limit) {
                limit = 0;
            }
            where = {
                where: {
                    status: 1,
                },
                attributes: ['id', 'title'],
                'limit': 18, offset: limit,
                order: 'id desc'
            };
            ctx.body = yield imageServiceModel.getTitleDbFindAll(where);
        });
    }
    static getCount(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = yield imageServiceModel.getTitleDbCount();
            ctx.body = { count };
        });
    }
    static getImgBuffer(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //    img-proxy
            let arg = ctx.params;
            let titleId = arg.titleId;
            let id = arg.id;
            let whereId;
            if (titleId) {
                whereId = { titleId };
            }
            else if (id) {
                whereId = { id };
            }
            let whereOne = {
                where: whereId,
                'limit': 1, offset: 0,
                attributes: ['url']
            };
            let imgPath = yield imageServiceModel.getImgDbFindOne(whereOne);
            let resUrl = imageServiceModel.handelReferer(imgPath.url);
            let option = { headers: {}, iSEncoding: true, resolveWithFullResponse: true };
            if (resUrl) {
                option.headers['Referer'] = 'http://girl-atlas.net/';
            }
            let imgBuffer = yield reqModel_1.httpGet(imgPath.url, {}, option);
            let buffer = imgBuffer.body;
            if (titleId) {
            }
            ctx.set('Content-Type', imgBuffer.headers['content-type']);
            ctx.set('Cache-Control', 'max-age=259200');
            ctx.body = buffer;
        });
    }
    static getSearchTitle(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let where;
            if (arg.title) {
                where = {
                    where: {
                        status: 1,
                        title: { like: '%' + arg.title + '%' },
                    },
                    attributes: ['id', 'title']
                };
                ctx.body = yield imageServiceModel.getTitleDbFindAll(where);
            }
        });
    }
    static getTitleIdImg(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arg = ctx.params;
            let whereAll, whereOne;
            if (arg.titleId) {
                whereAll = {
                    where: {
                        titleId: arg.titleId,
                    },
                    attributes: ['id', 'titleId']
                };
                whereOne = {
                    where: {
                        status: 1,
                        id: arg.titleId,
                    },
                    attributes: ['title']
                };
                let list = yield imageServiceModel.getImgDbFindAll(whereAll);
                let title = yield imageServiceModel.getTitleDbFindOne(whereOne);
                ctx.body = { list, title };
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = imageService;
