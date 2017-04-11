/**
 * Created by zhoucaiguang on 2017/3/27.
 */
"use strict";
const admin_1 = require('../router/admin');
const baseKeyWord_1 = require('../router/baseKeyWord');
const img_1 = require('../router/img');
const login_1 = require('../router/login');
const title_1 = require('../router/title');
const configs_1 = require('../router/configs');
const users_1 = require('../router/users');
var Methods;
(function (Methods) {
    Methods[Methods["post"] = 0] = "post";
    Methods[Methods["get"] = 1] = "get";
})(Methods || (Methods = {}));
exports.config = [
    {
        method: Methods[Methods.get],
        url: '/admin',
        fn: admin_1.default.index
    },
    {
        method: Methods[Methods.post],
        url: '/admin/Login',
        fn: admin_1.default.login
    },
    {
        method: Methods[Methods.get],
        url: '/admin/loginOut',
        fn: admin_1.default.loginOut
    },
    {
        method: Methods[Methods.get],
        url: '/baseKeyWord/getValidAll',
        fn: baseKeyWord_1.default.getValidAll
    },
    {
        method: Methods[Methods.get],
        url: '/img',
        fn: img_1.default.index
    },
    {
        method: Methods[Methods.get],
        url: '/title',
        fn: title_1.default.index
    },
    {
        method: Methods[Methods.get],
        url: '/login',
        fn: login_1.default.index
    },
    {
        method: Methods[Methods.get],
        url: '/users',
        fn: users_1.default.index
    },
    {
        method: Methods[Methods.get],
        url: '/baseKeyWord/getAll',
        fn: baseKeyWord_1.default.getAll
    },
    {
        method: Methods[Methods.get],
        url: '/baseKeyWord/getValidAll',
        fn: baseKeyWord_1.default.getValidAll
    },
    {
        method: Methods[Methods.post],
        url: '/baseKeyWord/addData',
        fn: baseKeyWord_1.default.addData
    },
    {
        method: Methods[Methods.post],
        url: '/baseKeyWord/upDate',
        fn: baseKeyWord_1.default.upDate
    },
    {
        method: Methods[Methods.post],
        url: '/baseKeyWord/deleteDate',
        fn: baseKeyWord_1.default.deleteDate
    },
    {
        method: Methods[Methods.post],
        url: '/baseKeyWord/deleteDate',
        fn: baseKeyWord_1.default.deleteDate
    },
    {
        method: Methods[Methods.post],
        url: '/configs/addConfig',
        fn: configs_1.default.addConfig
    },
    {
        method: Methods[Methods.get],
        url: '/configs/getValidAll',
        fn: configs_1.default.getValidAll
    },
    {
        method: Methods[Methods.post],
        url: '/configs/settingIsUse',
        fn: configs_1.default.settingIsUse
    },
    {
        method: Methods[Methods.get],
        url: '/configs/searchWebName/:webName',
        fn: configs_1.default.searchWebName
    },
    {
        method: Methods[Methods.get],
        url: '/configs/configDetail/:id',
        fn: configs_1.default.configDetail
    },
    {
        method: Methods[Methods.post],
        url: '/configs/updateConfig',
        fn: configs_1.default.updateConfig
    },
    {
        method: Methods[Methods.get],
        url: '/configs/deleteConfig/:id',
        fn: configs_1.default.deleteConfig
    },
    {
        method: Methods[Methods.get],
        url: '/titles/getAllTitle/:limit',
        fn: title_1.default.getAllTitle
    },
    {
        method: Methods[Methods.get],
        url: '/titles/getTitleDetail/:id',
        fn: title_1.default.getTitleDetail
    },
    {
        method: Methods[Methods.get],
        url: '/titles/searchTitle/:title',
        fn: title_1.default.searchTitle
    }
];
