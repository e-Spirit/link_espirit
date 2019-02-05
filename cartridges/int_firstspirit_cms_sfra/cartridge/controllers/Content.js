'use strict';

var server = require('server');
var velocityRendering = require('~/cartridge/scripts/com/espirit/sfcc/VelocityRendering');
var constants = require('*/cartridge/scripts/com/espirit/sfcc/Constants');
var logger = require('dw/system/Logger').getLogger(constants.LOGFILE_PREFIX, 'com.espirit.sfcc.Content');

/**
* This controllers renders the content of the
* given request body using the Velocity engine.
*/

server.post('Render', function (req, res, next) {
    try {
        logger.debug('Received request to render content.');

        var requestBody = req.body;
        if (requestBody) {
            if (req.querystring.pid) {
                var result = velocityRendering.renderProduct(requestBody, req.querystring);
                if (result) {
                    res.print(result);
                    return this.done(req, res);
                }
            }

            res.print(velocityRendering.render(requestBody));
            return this.done(req, res);
        }
    } catch (e) {
        logger.error('Rendering failed: ' + e);
        logger.error(e.stack);
        res.setStatusCode(500);
        res.print('The request could not be processed. See log for details.');
    }

    return next();
});

module.exports = server.exports();
