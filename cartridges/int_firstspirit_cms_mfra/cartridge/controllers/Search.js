'use strict';

/**
 * This controller integrates Velocity category detail pages that are being
 * managed by FirstSpirit. It prepends the show method of the Search controller
 * and checks for a present content asset. If found, it requests a search result
 * rendering for the 'searchResultsNoDecoratorNoBanner.isml' and passes
 * the results to the rendering of the body of the content asset.
 */

var server = require('server');
var search = require('app_storefront_base/cartridge/controllers/Search');
var velocityCategoryPage = require('*/cartridge/scripts/com/espirit/sfcc/VelocityCategoryPage');

server.extend(search);
server.prepend('Show', function (req, res, next) {
    var cgid = req.querystring.cgid;
    var velocityCategoryPageContent =
        velocityCategoryPage.getVelocityCategoryPage(cgid, request.httpQueryString);

    if (velocityCategoryPageContent) {
        res.print(velocityCategoryPageContent);
        return this.done(req, res);
    }

    next();
});

module.exports = server.exports();
