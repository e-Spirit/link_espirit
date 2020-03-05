'use strict';

var ContentAsset = require('./contentAsset');

module.exports.getContent = function (caId) {
    if (caId === 'fs-categorydetail-mens') {
        return new ContentAsset(caId);
    } else if (caId === 'fs-productdetail-61235') {
        return new ContentAsset(caId);
    } else if (caId === 'fs-productdetail-61237') {
        return new ContentAsset(caId);
    }

    return null;
};
