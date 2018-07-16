"use strict";
exports.__esModule = true;
var uri_1 = require("./uri");
var settings_1 = require("./settings");
function redirect(path) {
    if (settings_1.settings.history) {
        return window.location.href = uri_1.uri(path);
    }
    window.location.hash = uri_1.uri(path);
}
exports.redirect = redirect;
