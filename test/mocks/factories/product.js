'use strict';

module.exports.get = function (querystring) {
    if (querystring.includes('pid=61235')) {
        return 'product';
    } else if (querystring.includes('pid=61236')) {
        return 'product';
    }

    return null;
};
