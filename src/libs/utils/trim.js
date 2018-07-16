"use strict";
exports.__esModule = true;
function trim(document, options) {
    if (options === void 0) { options = 'ALL'; }
    if (options === 'ALL' || options === 'LEFT') {
        document = document.replace(/^\s*/g, '');
    }
    if (options === 'ALL' || options === 'RIGHT') {
        document = document.replace(/\s*$/g, '');
    }
    return document;
}
exports.trim = trim;
