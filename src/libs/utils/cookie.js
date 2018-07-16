"use strict";
exports.__esModule = true;
var empty_1 = require("./empty");
var trim_1 = require("./trim");
var cookie = /** @class */ (function () {
    function cookie() {
    }
    cookie.read = function (field) {
        if (empty_1.empty(field) || !cookie.has(field)) {
            return;
        }
        var regxpBuf = new RegExp([
            '(?:^|.*;\\s*)',
            global.escape(field).replace(/[\-\.\+\*]/g, '\\$&'),
            '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'
        ].join(''));
        return global.escape(window.document.cookie.replace(regxpBuf, '$1'));
    };
    cookie.each = function (callback) {
        var cookies = window.document.cookie.split(/; ?/g);
        for (var i = cookies.length - 1; 0 <= i; i--) {
            if (!trim_1.trim(cookies[i])) {
                continue;
            }
            var data = cookies[i].split('=');
            callback(global.escape(data[0]), global.escape(data[1]));
        }
    };
    cookie.write = function (field, data) {
        if (empty_1.empty(field)) {
            return;
        }
        window.document.cookie = [
            global.escape(field) + '=' + global.escape(data) + ';',
            'expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'
        ].join('');
    };
    cookie.remove = function (field) {
        if (empty_1.empty(field) || !cookie.has(field)) {
            return;
        }
        window.document.cookie = [
            global.escape(field) + '=;',
            'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        ].join(' ');
    };
    cookie.clearAll = function () {
        cookie.each(function (_, field) {
            cookie.remove(field);
        });
    };
    cookie.has = function (field) {
        return (new RegExp([
            '(?:^|;\\s*)',
            global.escape(field).replace(/[\-\.\+\*]/g, '\\$&'),
            '\\s*\\='
        ].join(''))).test(window.document.cookie);
    };
    return cookie;
}());
exports.cookie = cookie;
