'use strict';

function ContentAsset(catId) {
    this.catId = catId;

    this.custom = {
        body: catId + '_body'
    };
}

module.exports = ContentAsset;
