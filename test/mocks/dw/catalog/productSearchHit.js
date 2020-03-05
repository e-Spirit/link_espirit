'use strict';

function ProductSearchHit(product) {
    this.product = product;
}

ProductSearchHit.prototype.getProduct = function () {
    return this.product;
};

module.exports = ProductSearchHit;
