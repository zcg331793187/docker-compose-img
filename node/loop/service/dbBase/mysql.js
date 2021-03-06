/**
 * Created by zhoucaiguang on 2017/3/8.
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
var SequelizeDb_1 = require('../dbBase/SequelizeDb');
// import * as Promise from 'bluebird';
var log4 = require('log4js');
var util = require('util');
var mysql = (function () {
    function mysql() {
        this.log = log4.getLogger();
    }
    mysql.prototype.addImgData = function (titleId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.ImgDb.create({
                'titleId': titleId,
                'url': url
            });
        });
    };
    mysql.prototype.addImgTitle = function (title, imgThums) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.TitleDb.create({
                'title': title,
                'imgThums': imgThums
            });
        });
    };
    mysql.prototype.checkTtileIsSave = function (title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.TitleDb.findOne({
                'where': {
                    'title': title
                }
            });
        });
    };
    mysql.prototype.checkImgDataAndInsert = function (herfs, title) {
        return __awaiter(this, void 0, void 0, function* () {
            var response;
            response = yield SequelizeDb_1.TitleDb.findOne({ 'where': { 'title': title } });
            try {
                if (!response) {
                    // console.log('标题不存在');
                    response = yield this.addImgTitle(title, herfs[0]);
                    yield this.addImgs(herfs, response.id); //待测试
                }
                else {
                    yield this.addImgs(herfs, response.id);
                }
            }
            catch (err) {
            }
            return response;
        });
    };
    mysql.prototype.addImgs = function (herfs, titleId) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = this.handleImgData(herfs, titleId);
            for (var i in data) {
                yield this.addImgData(data[i].titleId, data[i].url);
            }
            return [];
        });
    };
    mysql.prototype.handleImgData = function (hrefs, title) {
        var data = {};
        hrefs.forEach(function (item, index) {
            data = { url: item, titleId: title };
            hrefs[index] = data;
        });
        return hrefs;
    };
    mysql.prototype.addWeiBoImgs = function (imgs, titleId) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i in imgs) {
                yield SequelizeDb_1.ImgDb.create({
                    'titleId': titleId, 'url': imgs[i]
                }).catch(function (error) {
                    // console.warn(error);
                });
            }
            return imgs;
        });
    };
    mysql.prototype.getWeiBoFollow = function (offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.WeiboDb.find({ 'attributes': ['id', 'containerId', 'niceName'], 'limit': 1, offset: offset });
        });
    };
    mysql.prototype.getConfigs = function (offset) {
        return __awaiter(this, void 0, void 0, function* () {
            var newConfig = false;
            var config = yield SequelizeDb_1.ConfigDb.findOne({
                'attributes': ['webName', 'config'], 'limit': 1,
                offset: offset,
                'where': {
                    'isUse': 1
                }
            });
            if (config) {
                newConfig = JSON.parse(config.config);
            }
            return newConfig;
        });
    };
    mysql.prototype.insertWeiBoFollow = function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i in data) {
                yield SequelizeDb_1.WeiboDb.create({
                    'uid': data[i].uid, 'niceName': data[i].nickName, 'containerId': data[i].containerId
                }).catch(function (error) {
                    // console.warn(error);
                });
            }
            return data;
        });
    };
    return mysql;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mysql;
