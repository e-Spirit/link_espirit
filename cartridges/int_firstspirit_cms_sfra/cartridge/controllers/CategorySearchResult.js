'use strict';

var server = require('server');
var constants = require('*/cartridge/scripts/com/espirit/sfcc/Constants');
var search = require(constants.BASE_CARTRIDGE + '/cartridge/controllers/Search');

/**
* This controllers appends the show route of the
* Search controller and resets the previous rendering
* results in order to render the custom template
* 'searchResultsNoDecoratorNoBanner' with the
* previously calculated search result data.
*/

server.extend(search);
server.append('Show', function (req, res, next) {
    this.on('route:BeforeComplete', function (innerReq, innerRes) {
        var viewData = innerRes.getViewData();

        // Resetting the previous rendering results
        innerRes.render(null, {});
        innerRes.setViewData({});
        innerRes.render('/search/searchResultsNoDecoratorNoBanner', viewData);
    });
    return next();
});

module.exports = server.exports();
