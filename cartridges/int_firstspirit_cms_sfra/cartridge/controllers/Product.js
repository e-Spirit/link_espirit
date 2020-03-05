/* globals request:false */

'use strict';

/**
 * This controller integrates Velocity product detail pages that are being
 * managed by FirstSpirit. It prepends the show method of the Product controller
 * and checks for a present content asset. If found, it renders the body of the
 * content asset using the Velocity engine. It also provides a route to render
 * a specified product templates with the necessary context data by rendering
 * it with the ProductTemplateWrapper ISML template.
 */

var server = require('server');
var constants = require('*/cartridge/scripts/com/espirit/sfcc/constants');
var productController = require(constants.BASE_CARTRIDGE + '/cartridge/controllers/Product');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.extend(productController);
server.prepend('Show', function (req, res, next) {
    var velocityProductPage = require('*/cartridge/scripts/com/espirit/sfcc/velocityProductPage');
    var pid = req.querystring.pid;
    var velocityProductPageContent =
        velocityProductPage
            .getVelocityProductDetailPage(pid, req.querystring, request.httpQueryString);

    if (velocityProductPageContent) {
        res.print(velocityProductPageContent);
        return this.done(req, res);
    }

    return next();
});

/**
 * Renders a product template with a wrapper template
 * that provides all necessary pdict variables.
 */
server.get('WrapProductTemplate', function (req, res) {
    var querystring = req.querystring;

    if (querystring.pid && querystring.productTemplate) {
        var productTemplate = querystring.productTemplate;
        var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
        var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
        var productType = showProductPageHelperResult.product.productType;

        if (!showProductPageHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
            res.setStatusCode(404);
            res.render('error/notFound');
        } else {
            var isml = require('dw/template/ISML');
            isml.renderTemplate('product/productTemplateWrapper', {
                product: showProductPageHelperResult.product,
                addToCartUrl: showProductPageHelperResult.addToCartUrl,
                resources: showProductPageHelperResult.resources,
                breadcrumbs: showProductPageHelperResult.breadcrumbs,
                canonicalUrl: showProductPageHelperResult.canonicalUrl,
                schemaData: showProductPageHelperResult.schemaData,
                productTemplate: productTemplate
            });
        }
    }
}, pageMetaData.computedPageMetaData);

/**
 * Renders the productRecommendation template which includes
 * the product-recommendations slot.
 */
server.get('ProductRecommendation', function () {
    var isml = require('dw/template/ISML');
    isml.renderTemplate('product/components/productRecommendation');
});

module.exports = server.exports();
