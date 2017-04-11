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
const db = require('../db/SequelizeDb');
function getImgDbFindAll(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.ImgDb.findAll(where);
    });
}
exports.getImgDbFindAll = getImgDbFindAll;
function getImgDbFindOne(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.ImgDb.findOne(where);
    });
}
exports.getImgDbFindOne = getImgDbFindOne;
function getTitleDbFindAll(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.TitleDb.findAll(where);
    });
}
exports.getTitleDbFindAll = getTitleDbFindAll;
function getTitleDbFindOne(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.TitleDb.findOne(where);
    });
}
exports.getTitleDbFindOne = getTitleDbFindOne;
function getTitleDbCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.TitleDb.count();
    });
}
exports.getTitleDbCount = getTitleDbCount;
function handelReferer(url) {
    if (url.indexOf('girlatlas') > -1) {
        return 'http://girlatlas.b0.upaiyun.com/';
    }
    else {
        return null;
    }
}
exports.handelReferer = handelReferer;
