'use strict';

var assert = require('assert');

module.exports.getLogger = function () {
    return {
        'debug': function () {},
        'error': function (message) {
            assert.fail(message);
        }
    };
};
