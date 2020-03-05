'use strict';

var ContentAsset = require('./contentAsset');
var Iterator = require('../util/iterator');

function ContentSearchModel() { }

ContentSearchModel.prototype.getContent = function () {
    var content = [];
    if (this.contentId) {
        content.push(new ContentAsset(this.contentId));
    }
    return new Iterator(content);
};

ContentSearchModel.prototype.getCount = function () {
    if (this.contentId) {
        return 1;
    }

    return 0;
};

ContentSearchModel.prototype.search = function () { };

ContentSearchModel.prototype.setContentID = function (contentId) {
    if (contentId === 'fs-productdetail-61235' || contentId === 'fs-productdetail-61237') {
        this.contentId = contentId;
    }
};

module.exports = ContentSearchModel;
