'use strict';

var CatalogItem = require('./CatalogItem');
var Iterator = require('../util/Iterator');

function ProductSearchModel() { }

ProductSearchModel.prototype.getCategory = function () {
    if (this.categoryId) {
        return new CatalogItem(this.categoryId, 'category_' + this.categoryId, 'template_' + this.categoryId);
    }
    return null;
};

ProductSearchModel.prototype.getProducts = function () {
    var products = [];
    if (this.productId) {
        products.push(new CatalogItem(this.productId, 'product_' + this.productId, 'template_' + this.productId));
    }
    return new Iterator(products);
};

ProductSearchModel.prototype.search = function () { };

ProductSearchModel.prototype.setCategoryID = function (categoryId) {
    if (categoryId === '123') {
        this.categoryId = categoryId;
    }
};

ProductSearchModel.prototype.setProductID = function (productId) {
    if (productId === '123') {
        this.productId = productId;
    }
};

module.exports = ProductSearchModel;
