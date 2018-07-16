"use strict";
exports.__esModule = true;
var cookie_1 = require("./cookie");
var empty_1 = require("./empty");
var json_1 = require("./json");
var storage_1 = require("./storage");
var settings_1 = require("./settings");
function auth(document) {
    if (document === void 0) { document = null; }
    if (settings_1.settings.history) {
        if (empty_1.empty(document)) {
            return json_1.json(cookie_1.cookie.read(settings_1.settings.authKey || 'auth'));
        }
        return cookie_1.cookie.write(settings_1.settings.authKey || 'auth', json_1.json(document));
    }
    if (empty_1.empty(document)) {
        return json_1.json(storage_1.storage.read(settings_1.settings.authKey || 'auth'));
    }
    return storage_1.storage.write(settings_1.settings.authKey || 'auth', json_1.json(document));
}
exports.auth = auth;
