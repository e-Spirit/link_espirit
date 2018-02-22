'use strict';

var server = require('server');
var isml = require('dw/template/ISML');
var search = require('app_storefront_base/cartridge/controllers/Search');

/**
* This controllers appends the show route of the
* Search controller and resets the previous rendering
* results in order to render the custom template
* 'searchResultsNoDecoratorNoBanner' with the
* previously calculated search result data.
*/

server.extend(search);
server.append('Show', function (req, res) {
    var viewData = res.getViewData();

    // Resetting the previous rendering results
    res.render(null, {});
    res.setViewData({});

    isml.renderTemplate('/search/searchResultsNoDecoratorNoBanner', viewData);
});

module.exports = server.exports();
