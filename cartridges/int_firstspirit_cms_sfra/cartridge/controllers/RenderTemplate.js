'use strict';

/**
 * This controller exports functions that allow to query
 * the 'template' property of a given category or product.
 * The controller is not needed in the storefront, but only in FirstSpirit.
 * The information is used to make the mapping of SFCC render templates
 * to FirstSpirit templates possible and therewith allow the creation
 * of product and category detail pages.
 */

var server = require('server');

/**
* Gets a full path to scripts of the firstspirit core cartridge.
*
* @param {string} relativePath The relative path of the script.
* @returns {string} Returns the full path to the script.
*/
function script(relativePath) {
    return '*/cartridge/scripts/' + relativePath;
}

/**
 * Gets the render template for the object specified by the id parameter,
 * using the given supplier function.
 * The result will be written to the response.
 * @param {string} id specifies the object whose render template is requested
 * @param {function} supplierFunction will be used to get the render template
 * @param {Object} response The result of calling the supplier function
 *      will be written to this response using the 'json' method
 * @param {function} next will be called after the result has been written to the response
 */
function supplyRenderTemplate(id, supplierFunction, response, next) {
    var result = supplierFunction(id);
    response.json(result);
    next();
}

/**
 * Returns a json containing the 'template' property of the product identified
 * by the input parameter 'prod_id'.
 */
server.get('Product', function (req, res, next) {
    var prodId = req.querystring.prod_id;
    var renderTemplateImpl = require(script('com/espirit/sfcc/renderTemplateImpl'));
    supplyRenderTemplate(prodId, renderTemplateImpl.getProductTemplate, res, next);
});

/**
 * Returns a json containing the 'template' property of the category identified
 * by the input parameter 'cat_id'.
 */
server.get('Category', function (req, res, next) {
    var catId = req.querystring.cat_id;
    var renderTemplateImpl = require(script('com/espirit/sfcc/renderTemplateImpl'));
    supplyRenderTemplate(catId, renderTemplateImpl.getCategoryTemplate, res, next);
});

module.exports = server.exports();
