'use strict';

/**
 * This controller exports functions that allow to query
 * the 'template' property of a given category or product.
 * The controller is not needed in the storefront, but only in FirstSpirit.
 * The information is used to make the mapping of SFCC render templates
 * to FirstSpirit templates possible and therewith allow the creation
 * of product and category detail pages.
 */

/**
* Gets a full path to scripts of the firstspirit core cartridge.
*
* @param {string} relativePath The relative path of the script.
* @returns {string} Returns the full path to the script.
*/
function script(relativePath) {
    return '*/cartridge/scripts/' + relativePath;
}

var guard = require(script('guard'));

/**
 * Gets the render template for the object specified by the id parameter,
 * using the given supplier function.
 * The result will be written to the response.
 * @param {string} id specifies the object whose render template is requested
 * @param {function} supplierFunction will be used to get the render template
 */
function supplyRenderTemplate(id, supplierFunction) {
    var result = supplierFunction(id);
    response.setContentType('application/json');
    response.getWriter().print(JSON.stringify(result));
}

/**
 * Returns a json containing the 'template' property of the category identified
 * by the input parameter 'cat_id'.
 */
function getProduct() {
    var prodId = request.getHttpParameterMap().get('prod_id').getStringValue();
    var renderTemplateImpl = require(script('com/espirit/sfcc/RenderTemplateImpl'));
    supplyRenderTemplate(prodId, renderTemplateImpl.getProductTemplate);
}

/**
 * Returns a json containing the 'template' property of the product identified
 * by the input parameter 'prod_id'.
 */
function getCategory() {
    var catId = request.getHttpParameterMap().get('cat_id').getStringValue();
    var renderTemplateImpl = require(script('com/espirit/sfcc/RenderTemplateImpl'));
    supplyRenderTemplate(catId, renderTemplateImpl.getCategoryTemplate);
}

exports.Category = guard.ensure(['get'], getCategory);
exports.Product = guard.ensure(['get'], getProduct);
