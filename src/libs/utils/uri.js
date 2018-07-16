"use strict";
exports.__esModule = true;
var settings = {
    debug: !process.env.production || false,
    history: false,
    appID: 'ShrsVtsx',
    authKey: 'auth',
    pathHome: '/',
    pathAPI: !process.env.production
        ? 'http://localhost:10007' || 'http://192.168.0.191:10007'
        : 'http://www.shrs2006.com'
};
function uri(path) {
    if (typeof (path) === 'undefined') {
        return settings.history
            ? window.location.pathname
            : window.location.hash;
    }
    if (path.indexOf(':lang') !== -1) {
        return path.replace(':lang', String(settings.history
            ? window.location.pathname
            : window.location.hash).split('/')[1]);
    }
    return path;
}
exports.uri = uri;
