'use strict';

var constants = require('*/cartridge/scripts/com/espirit/sfcc/Constants');
var logger = require('dw/system/Logger').getLogger(constants.LOGFILE_PREFIX, 'com.espirit.sfcc.VelocityProductPage');
var velocity = require('dw/template/Velocity');
var urlUtils = require('dw/web/URLUtils');
var velocityRendering = require('~/cartridge/scripts/com/espirit/sfcc/VelocityRendering');

var PRODUCT_DETAIL_PAGE_CA_PREFIX = 'fs-productdetail-';
var global = {
    include: {
        widget: velocity.remoteInclude,
        staticURL: urlUtils.staticURL
    },
    action: 'Product-Show'
};

/**
* Checks whether a product detail page (content asset) exists for the given product id
* and renders the body of the content asset.
*
* @param {string} pid The id of the product.
* @param {string} querystring The query string to use.
* @param {string} httpQueryString The global query string to use.
* @returns {(string|boolean)} Returns the rendered product detail page if found,
*                             otherwise returns false.
*/
function getVelocityProductDetailPage(pid, querystring, httpQueryString) {
    if (pid) {
        var ContentSearchModel = require('dw/content/ContentSearchModel');
        var apiContentSearchModel = new ContentSearchModel();
        apiContentSearchModel.setContentID(PRODUCT_DETAIL_PAGE_CA_PREFIX + pid);
        apiContentSearchModel.search();

        if (apiContentSearchModel.getCount() > 0) {
            var contentSearchResult = apiContentSearchModel.getContent();
            var productDetailContentAsset = contentSearchResult.next();
            logger.debug('Content asset for product ' + pid + ' found.');
            var ProductFactory = require('*/cartridge/scripts/factories/product');
            var product = ProductFactory.get(querystring);

            if (product) {
                global.product = product;
                global.querystring = httpQueryString;
                logger.debug('Rendering content asset body.');
                return velocityRendering
                    .renderCustom(productDetailContentAsset.custom.body, global);
            }
        }
    }

    return false;
}

exports.getVelocityProductDetailPage = getVelocityProductDetailPage;
