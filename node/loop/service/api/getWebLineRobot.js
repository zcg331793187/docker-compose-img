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
var req_1 = require('./req');
var weiboRole_1 = require('../configs/weiboRole');
var cheerio = require('cheerio');
var Tool = require('../utils/Tool');
var mysql_1 = require('../dbBase/mysql');
// import * as Promise from 'bluebird';
var log4 = require('log4js');
var log4_1 = require('../configs/log4');
var iconv = require('iconv-lite');
var robot = (function () {
    function robot() {
        this.urlAll = [];
        this.urlNow = [];
        this.index = 0;
        this.count = 0;
        this.loop = 0;
        this.db = new mysql_1.default();
        log4.configure(log4_1.log4Config);
        this.log = log4.getLogger();
    }
    robot.prototype.test = function () {
        var list = [
            'http://www.xiumm.cc/data/0166/79/14869855439014.jpg',
            'http://www.xiumm.cc/data/0166/79/1486985542263.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855394032.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855434423.jpg',
            'http://www.xiumm.cc/data/0166/82/14869855847266.jpg',
        ];
        // this.db.checkImgDataAndInsert(list,'测试');
        // return  this.db.addImgTitle('123123','http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        return this.db.checkImgDataAndInsert(list, '测试');
        // console.log(ddd);
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
    };
    robot.prototype.init = function () {
        // let ddd =   this.test();
        //
        this.getUrlInit();
        // await this.db.getConfigs(this.index);
        // this.handelAuto();
        // this.getWeiboFollowInit(0);
        // this.getWeiboImgInit(0, 0);
    };
    robot.prototype.getUrlInit = function () {
        var _this = this;
        this.getUrl().then(function (res) {
            _this.getUrlInit();
        });
    };
    robot.prototype.handelAuto = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var configs = yield this.db.getConfigs(this.index);
            if (!configs) {
                this.index = 0;
            }
            return configs;
        });
    };
    robot.prototype.getWeiboFollowInit = function (page) {
        var _this = this;
        this.getWeiboFollowList(page).then(function (res) {
            console.log('关注列表，第' + res.config.page + '页');
            _this.getWeiboFollowInit(res.config.page);
        });
    };
    robot.prototype.getWeiboImgInit = function (page, offset) {
        var _this = this;
        this.getWeiboUrl(page, offset).then(function (res) {
            if (res['_data']) {
                if (res['_data']['cardlistInfo']['page']) {
                    _this.getWeiboImgInit(res.page, offset);
                }
                else {
                    offset++;
                    _this.getWeiboImgInit(0, offset);
                }
            }
            else {
                offset++;
                _this.getWeiboImgInit(0, offset);
            }
        });
    };
    robot.prototype.getWeiboFollowList = function (page) {
        return __awaiter(this, void 0, void 0, function* () {
            var config = weiboRole_1.followListConfig[0];
            var _data = [];
            var okData;
            var option = {};
            var follows = [];
            if (config) {
                try {
                    var res = yield req_1.httpGet(weiboRole_1.followListAPi, config, option);
                    _data = JSON.parse(res);
                    follows = Tool.handleWeiBoFollows(_data);
                    okData = yield this.getWeiboUserContainerId(follows);
                    okData = yield this.getWeiboMobileContainerId(okData);
                    yield this.db.insertWeiBoFollow(okData);
                    console.log('请求完一次');
                }
                catch (err) {
                    console.warn(err.statusCode);
                    if (err.statusCode == 403) {
                        console.log('-------------------用户关注列表请求频繁------------------');
                        yield this.setTimeout(Math.ceil(Math.random() * 120));
                    }
                }
            }
            yield this.setTimeout(Math.ceil(Math.random() * 10));
            console.log('走');
            if (_data['count']) {
                config.page++;
            }
            else {
                config.page = 0;
                console.log('end');
            }
            return { config: config, _data: _data };
        });
    };
    robot.prototype.setTimeout = function (m) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(null);
                }, m * 1000);
            });
        });
    };
    robot.prototype.getWeiboUserContainerId = function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var i = data_1[_i];
                i.containerId = yield req_1.httpGet(weiboRole_1.weiboMobileApi + i.uid, {}, { resolveWithFullResponse: true });
                i.containerId = Tool.getContainerId(i.containerId);
            }
            return data;
        });
    };
    robot.prototype.getWeiboMobileContainerId = function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            var temp;
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var i = data_2[_i];
                temp = yield req_1.httpGet(weiboRole_1.weiboUserDataApi, { uid: i.uid, containerid: i.containerId }, {});
                temp = JSON.parse(temp);
                i.containerId = temp['tabsInfo']['tabs'][1]['containerid'];
                yield this.setTimeout(10);
            }
            return data;
        });
    };
    robot.prototype.getWeiboUrl = function (page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.setTimeout(40);
            var configDb = yield this.db.getWeiBoFollow(offset);
            var idObj;
            var config = {};
            var data;
            if (configDb) {
                try {
                    config = { page: page, uid: configDb.uid, containerid: configDb.containerId };
                    data = yield req_1.httpGet(weiboRole_1.weiboUserDataApi, config, {});
                    data = JSON.parse(data);
                    var imgs = Tool.handleWeiBoImgs(data);
                    idObj = yield this.db.checkTtileIsSave(configDb.niceName);
                    if (!idObj) {
                        idObj = yield this.db.addImgTitle(configDb.niceName, imgs[0]);
                    }
                    console.log('用户微博:', configDb.niceName, '。第' + page + '页', '当前页面图片数:', imgs.length);
                    yield this.db.addWeiBoImgs(imgs, idObj.id);
                }
                catch (error) {
                    console.warn(error.statusCode);
                    if (error.statusCode == 403) {
                        console.log('-------------------用户微博请求频繁------------------');
                        yield this.setTimeout(Math.ceil(Math.random() * 120));
                    }
                }
                page++;
            }
            else {
                console.log('没有可用微博爬虫配置信息');
                // await this.setTimeout(360);
                // await this.setTimeout(Math.ceil(Math.random()*360));
                offset = 0;
            }
            yield this.setTimeout(Math.ceil(Math.random() * 10));
            // console.log(data);
            return { page: page, _data: data, offset: offset };
        });
    };
    robot.prototype.getUrl = function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.urlNow.length == 0) {
                this.urlAll = [];
                this.urlNow = [];
                this.count = 0;
                this.task = yield this.handelAuto();
                if (!this.task) {
                    this.task = yield this.handelAuto();
                }
                this.url = this.task.url;
                this.index++;
                this.loop++;
            }
            else {
                Tool.sortType(this.urlNow, this.task.sortType);
                this.url = this.urlNow.shift();
            }
            console.log('进行地址：', this.url);
            var data = yield this.loopGetUrl(this.url, {}, this.task);
            if (data[1]) {
                // console.log(res[1]);
                if (data[1].title && data[1].list.length > 0) {
                    yield this.db.checkImgDataAndInsert(data[1].list, data[1].title);
                }
            }
            console.log('总源地址数量：', this.urlAll.length);
            console.log('剩余源地址数量：', this.urlNow.length);
            console.log('已进行：', this.count);
            // _this.getUrl();
            return [];
        });
    };
    robot.prototype.loopGetUrl = function (url, data, task) {
        return __awaiter(this, void 0, void 0, function* () {
            var returnURL;
            var returnImgURL;
            try {
                var req = yield req_1.httpGet(url, data, task);
                if (task['iSGzip'] == true && task['iSgb2312'] != true) {
                    req = yield Tool.unzlip(req);
                    req = iconv.decode(req, 'utf-8');
                }
                if (task['iSgb2312'] == true) {
                    req = iconv.decode(req, 'gb2312');
                }
                this.count++;
                var $ = cheerio.load(req);
                returnURL = Tool.getAllHref($, url, task, this.urlAll, this.urlNow);
                returnImgURL = Tool.handleImagesUrl(this.url, $, task);
            }
            catch (error) {
                console.log(error);
                console.log('请求错误');
                returnURL = [0];
                returnImgURL = [1];
            }
            return [returnURL, returnImgURL];
        });
    };
    return robot;
}());
exports.robot = robot;
