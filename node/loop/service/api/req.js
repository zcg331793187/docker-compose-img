/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
var rp = require('request-promise');
var Promise = require('bluebird');
(function (MethodEnum) {
    MethodEnum[MethodEnum["GET"] = 0] = "GET";
    MethodEnum[MethodEnum["POST"] = 1] = "POST";
})(exports.MethodEnum || (exports.MethodEnum = {}));
var MethodEnum = exports.MethodEnum;
function processOptions(method, option, data, config) {
    if (method == MethodEnum.GET) {
        option.qs = data;
    }
    else if (method == MethodEnum.POST) {
        option.body = data;
    }
    else {
        throw ('未知的请求方式');
    }
    if (config.iSgb2312 == true) {
        option.encoding = null;
    }
    else if (config.iSEncoding == true) {
        option.encoding = null;
    }
    else if (config.iSGzip == true) {
        option.encoding = null;
    }
    if (config.headers) {
        option.headers = config.headers;
    }
    // console.log(option);
}
function req(uri, data, method, config) {
    var options = {
        uri: uri,
    };
    if (config.resolveWithFullResponse) {
        options.resolveWithFullResponse = true;
    }
    processOptions(method, options, data, config);
    return rp(options).then(function (response) {
        return Promise.resolve(response);
    }).catch(function (err) {
        return Promise.reject(err);
    });
}
function httpGet(uri, data, config) {
    if (data === void 0) { data = {}; }
    return req(uri, data, MethodEnum.GET, config);
}
exports.httpGet = httpGet;
function httpPost(uri, data, config) {
    if (data === void 0) { data = {}; }
    return req(uri, data, MethodEnum.POST, config);
}
exports.httpPost = httpPost;
