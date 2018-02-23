'use strict';

module.exports.getProduct = function (prodId) {
    if (prodId === '123') {
        var product = {
            getID: function () { return prodId; },
            getName: function () { return 'product_' + prodId; },
            getTemplate: function () { return 'template_' + prodId; }
        };

        return product;
    }

    return null;
};
