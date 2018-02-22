'use strict';

var ProductSearchModel = require('dw/catalog/ProductSearchModel');

/**
 * Gets a result object containing the 'template' property of the product identified
 * by the input parameter 'prodId'.
 *
 * @param {string} prodId Product id
 * @returns {Object} Returns a result object containing the result information,
 *                   otherwise an empty result.
 */
function getProductTemplate(prodId) {
    var result = {};

    if (prodId) {
        var productSearch = new ProductSearchModel();
        productSearch.setProductID(prodId);
        productSearch.search();
        var productSearchHits = productSearch.getProducts();

        if (productSearchHits.hasNext()) {
            var product = productSearchHits.next();
            result.id = product.getID();
            result.name = product.getName();
            result.template = product.getTemplate();
            result.type = 'product';
        } else {
            result.error = true;
            result.message = 'product not found for ' + prodId;
        }
    } else {
        result.error = true;
        result.message = 'product id missing';
    }

    return result;
}

/**
 * Gets a result object containing the 'template' property of the category identified
 * by the input parameter 'catId'.
 *
 * @param {string} catId Category id
 * @returns {Object} Returns a result object containing the result information,
 *                   otherwise an empty result.
 */
function getCategoryTemplate(catId) {
    var result = {};

    if (catId) {
        // We do not have to execute the actual search,
        // but we still want to use a search index, if possible
        var categorySearch = new ProductSearchModel();
        categorySearch.setCategoryID(catId);
        var category = categorySearch.getCategory();

        if (category) {
            result.id = category.getID();
            result.name = category.getDisplayName();
            result.template = category.getTemplate();
            result.type = 'category';
        } else {
            result.error = true;
            result.message = 'category not found for ' + catId;
        }
    } else {
        result.error = true;
        result.message = 'category id missing';
    }

    return result;
}

exports.getProductTemplate = getProductTemplate;
exports.getCategoryTemplate = getCategoryTemplate;
