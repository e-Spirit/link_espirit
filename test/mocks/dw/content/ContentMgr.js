'use strict';


function ContentAsset(catId) {
    this.catId = catId;

    this.custom = {
        body: catId + '_body'
    };
}

module.exports.getContent = function (catId) {
    if (catId === 'fs-categorydetail-mens') {
        return new ContentAsset(catId);
    }
    return null;
};
