"use strict";
exports.__esModule = true;
function sizeof(document) {
    if (document instanceof Array) {
        return document.length;
    }
    if (typeof (document) === 'object') {
        return Object.keys(document).length;
    }
    return String(document).length;
}
exports.sizeof = sizeof;
