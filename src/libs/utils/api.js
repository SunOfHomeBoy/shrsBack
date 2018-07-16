"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var auth_1 = require("./auth");
var json_1 = require("./json");
var redirect_1 = require("./redirect");
var settings_1 = require("./settings");

function api(path, document, callback) {
    axios_1["default"]({
            url: settings_1.settings.pathAPI + path,
            method: 'post',
            data: {
                accessToken: auth_1.auth().accessToken || '',
                appID: settings_1.settings.appID,
                parameters: json_1.json(document)
            },
            transformRequest: [
                function (data) {
                    console.log("api zx::", data);
                    var buf = [];
                    for (var i in data) {
                        buf.push.apply(buf, [
                            global.encodeURIComponent(i),
                            '=',
                            global.encodeURIComponent(data[i]),
                            '&'
                        ]);
                    }
                    return buf.join('');
                }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (response) {
            var responseData = response.data;
            if (typeof (response) === 'string') {
                responseData = json_1.json(response);
            }
            switch (responseData.code) {
                case 403:
                    return redirect_1.redirect(settings_1.settings.pathSignin || '/signin');
                case 404:
                    if (settings_1.settings.debug) {
                        console.log('Not Found');
                    }
                    break;
                case 500:
                    if (settings_1.settings.debug) {
                        console.log('Internal Server Error:');
                    }
                    break;
                default:
                    callback(responseData);
            }
        })["catch"](function (err) {
            console.log(`%c err %c ${err} `, "background:#f00 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000");
        });
}
exports.api = api;