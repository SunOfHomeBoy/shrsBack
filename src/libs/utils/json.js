"use strict";
exports.__esModule = true;
function json(parameters) {
    if (!parameters || typeof (parameters) === 'object') {
        try {
            return JSON.parse(parameters || '{}');
        }
        catch (err) { }
    }
    return JSON.stringify(parameters);
}
exports.json = json;
