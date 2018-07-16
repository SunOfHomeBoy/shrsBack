"use strict";
exports.__esModule = true;
var storage = /** @class */ (function () {
    function storage() {
    }
    storage.read = function (field) {
        return window.localStorage.getItem(field);
    };
    storage.each = function (callback) {
        for (var i = window.localStorage.length - 1; 0 <= i; i--) {
            var field = window.localStorage.key(i);
            callback(storage.read(field), field);
        }
    };
    storage.write = function (field, data) {
        window.localStorage.setItem(field, data);
    };
    storage.remove = function (field) {
        window.localStorage.removeItem(field);
    };
    storage.clearAll = function () {
        window.localStorage.clear();
    };
    return storage;
}());
exports.storage = storage;
