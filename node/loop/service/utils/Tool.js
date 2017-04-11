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
var zlib = require('zlib');
var url = require('url'); //解析操作url
function checkUrl(url, config, urlAll) {
    var re = true;
    for (var i in config.notLikeKeyWord) {
        try {
            if (url.indexOf(config.notLikeKeyWord[i]) > -1 || urlAll.indexOf(url) > -1) {
                re = false;
                break;
            }
        }
        catch (e) {
            console.log('checkUlr' + e);
        }
    }
    if (re) {
        for (var j in config.likeKeyWord) {
            try {
                if (url.indexOf(config.likeKeyWord[j]) > -1) {
                    re = true;
                    break;
                }
                else {
                    re = false;
                }
            }
            catch (e) {
                console.log('checkUlr' + e);
            }
        }
    }
    return re;
}
exports.checkUrl = checkUrl;
function spliceUrl(host, uri) {
    var href = null;
    try {
        href = url.resolve(host, uri);
    }
    catch (e) {
        console.warn(e);
        throw 'url error';
    }
    return href;
}
exports.spliceUrl = spliceUrl;
function getAllHref($, _thisUrl, configs, urlAll, urlNow) {
    var _this = this;
    var array = [];
    $('a').each(function (index, ele) {
        if (ele.attribs.href) {
            var path = _this.spliceUrl(_thisUrl, ele.attribs.href);
            var isOk = _this.checkUrl(path, configs, urlAll);
            if (isOk) {
                urlAll.push(path);
                urlNow.push(path);
                array.push(path);
            }
        }
    });
    return array;
}
exports.getAllHref = getAllHref;
function forEachSpliceUrl(url, uris) {
    var _this = this;
    uris.forEach(function (item, index) {
        uris[index] = _this.spliceUrl(url, item);
    });
    return uris;
}
exports.forEachSpliceUrl = forEachSpliceUrl;
function handleImagesUrl(url, $, configs) {
    var isOk = this.checkImagesKeyWordUrl(url, configs.imagesKeyWordUrl);
    var imgs = [];
    var title;
    if (isOk) {
        imgs = this.handleImgElement($, configs.imagesInfoElement, configs.imagesAttr, configs.imagesNotDownload);
        // console.log(imgs);
        this.forEachSpliceUrl(url, imgs);
        title = this.checkFolderNameElement($, configs.FolderNameElement, configs.FolderNamRegExp, configs.FolderNameAttr);
    }
    return { list: imgs, title: title };
}
exports.handleImagesUrl = handleImagesUrl;
function checkImagesKeyWordUrl(url, configs) {
    var re = false;
    for (var IK in configs) {
        if (url.indexOf(configs[IK]) > -1) {
            re = true;
            break;
        }
    }
    return re;
}
exports.checkImagesKeyWordUrl = checkImagesKeyWordUrl;
function checkFolderNameElement(obj, ele, RegExp, attr) {
    var temp;
    var tempString = null;
    for (var i in ele) {
        temp = obj(ele[i]);
        obj((ele[i])).each(function (id, eles) {
            for (var j in attr) {
                if (obj(eles).attr(attr[j])) {
                    tempString = obj(eles).attr(attr[j]);
                    break;
                }
            }
        });
    }
    if (!tempString) {
        tempString = temp['text']();
    }
    if (tempString) {
        for (var j in RegExp) {
            tempString = this.checkRegExp(tempString, RegExp[j]);
        }
    }
    if (!tempString) {
        tempString = '未定义';
    }
    return tempString;
}
exports.checkFolderNameElement = checkFolderNameElement;
function checkRegExp(str, exp) {
    return str.replace(exp, '');
}
exports.checkRegExp = checkRegExp;
function handleImgElement(obj, ele, attr, NotDownload) {
    var tmp = [];
    var tmps = [];
    var tmpsStauts = true;
    for (var i in ele) {
        obj((ele[i])).each(function (id, eles) {
            for (var j in attr) {
                if (obj(eles).attr(attr[j])) {
                    if (tmp.indexOf(obj(eles).attr(attr[j])) == -1) {
                        tmp.push(obj(eles).attr(attr[j]));
                    }
                }
            }
            // return;
        });
    }
    for (var r in tmp) {
        for (var t in NotDownload) {
            if (tmp[r].indexOf(NotDownload[t]) > -1) {
                tmpsStauts = false;
                break;
            }
        }
        if (tmpsStauts) {
            tmps.push(tmp[r]);
        }
        tmpsStauts = true;
    }
    return tmps;
}
exports.handleImgElement = handleImgElement;
function sortType(arr, config) {
    if (config == 'desc') {
        arr.reverse();
    }
    else if (config == 'asc') {
        arr.sort();
    }
}
exports.sortType = sortType;
function handleWeiBoImgs(req) {
    var imgs = [];
    req['cards'].forEach(function (item) {
        // console.log(item['mblog']['pics']);
        if (item['mblog']['pics']) {
            item['mblog']['pics'].forEach(function (item) {
                // console.log(item['large']['url']);
                imgs.push(item['large']['url']);
            });
        }
    });
    return imgs;
}
exports.handleWeiBoImgs = handleWeiBoImgs;
function handleWeiBoFollows(req) {
    var followList = [];
    if (req['cardlistInfo'].page) {
        if (req['cards']) {
            req['cards'].forEach(function (item) {
                // console.log(item['mblog']['pics']);
                if (item['user']) {
                    followList.push({ uid: item['user']['id'], nickName: item['user']['screen_name'] });
                }
            });
        }
    }
    return followList;
}
exports.handleWeiBoFollows = handleWeiBoFollows;
function getContainerId(res) {
    return decodeURIComponent(res.headers['set-cookie'][2]).match(/fid=+[0-9]+/i)[0].replace(/fid=/, '');
}
exports.getContainerId = getContainerId;
function unzlip(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield zlipPromise(data);
    });
}
exports.unzlip = unzlip;
var zlipPromise = function (data) {
    return new Promise(function (resolve, reject) {
        zlib.gunzip(data, function (err, dezipped) {
            resolve(dezipped);
        });
    });
};
function checkHttpUrl(urlString) {
    if (urlString != "") {
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!reg.test(urlString)) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.checkHttpUrl = checkHttpUrl;
