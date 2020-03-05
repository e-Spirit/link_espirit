/* globals request:false */

'use strict';

/**
 * This controller integrates Velocity category detail pages that are being
 * managed by FirstSpirit. It prepends the show method of the Search controller
 * and checks for a present content asset. If found, it requests a search result
 * rendering for the 'searchResultsNoDecoratorNoBanner.isml' and passes
 * the results to the rendering of the body of the content asset.
 */

var server = require('server');
var constants = require('*/cartridge/scripts/com/espirit/sfcc/constants');
var search = require(constants.BASE_CARTRIDGE + '/cartridge/controllers/Search');
var velocityCategoryPage = require('*/cartridge/scripts/com/espirit/sfcc/velocityCategoryPage');

server.extend(search);
server.prepend('Show', function (req, res, next) {
    var cgid = req.querystring.cgid;
    var velocityCategoryPageContent =
        velocityCategoryPage.getVelocityCategoryPage(cgid, request.httpQueryString);

    if (velocityCategoryPageContent) {
        res.print(velocityCategoryPageContent);
        return this.done(req, res);
    }

    return next();
});

module.exports = server.exports();
