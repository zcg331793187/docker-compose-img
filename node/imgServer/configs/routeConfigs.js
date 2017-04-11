/**
 * Created by zhoucaiguang on 2017/3/27.
 */
"use strict";
const imageService_1 = require('../router/imageService');
var Methods;
(function (Methods) {
    Methods[Methods["post"] = 0] = "post";
    Methods[Methods["get"] = 1] = "get";
})(Methods || (Methods = {}));
exports.config = [
    {
        method: Methods[Methods.get],
        url: '/imgDetail/:titleId',
        fn: imageService_1.default.getTitleIdImg
    },
    {
        method: Methods[Methods.get],
        url: '/imgSearch/:title',
        fn: imageService_1.default.getSearchTitle
    },
    {
        method: Methods[Methods.get],
        url: '/imgTitles/:limit',
        fn: imageService_1.default.getimgTitles
    },
    {
        method: Methods[Methods.get],
        url: '/imgProxy/id/:id',
        fn: imageService_1.default.getImgBuffer
    },
    {
        method: Methods[Methods.get],
        url: '/imgProxy/titleId/:titleId',
        fn: imageService_1.default.getImgBuffer
    },
    {
        method: Methods[Methods.get],
        url: '/imgtotal',
        fn: imageService_1.default.getCount
    }
];
