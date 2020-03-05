'use strict';

var CatalogItem = require('./catalogItem');
var Iterator = require('../util/iterator');
var ProductSearchHit = require('./productSearchHit');

function ProductSearchModel() { }

ProductSearchModel.prototype.getCategory = function () {
    if (this.categoryId) {
        return new CatalogItem(this.categoryId, 'category_' + this.categoryId, 'template_' + this.categoryId);
    }
    return null;
};

ProductSearchModel.prototype.getProductSearchHits = function () {
    var products = [];
    if (this.productIds && this.productIds[0]) {
        var product = new CatalogItem(this.productIds[0], 'product_' + this.productIds[0], 'template_' + this.productIds[0]);
        var productSearchHit = new ProductSearchHit(product);
        products.push(productSearchHit);
    }
    return new Iterator(products);
};

ProductSearchModel.prototype.search = function () { };

ProductSearchModel.prototype.setCategoryID = function (categoryId) {
    if (categoryId === '123') {
        this.categoryId = categoryId;
    }
};

ProductSearchModel.prototype.setProductIDs = function (productIds) {
    if (productIds && productIds.items[0] && productIds.items[0] === '123') {
        this.productIds = productIds.items;
    }
};

module.exports = ProductSearchModel;
