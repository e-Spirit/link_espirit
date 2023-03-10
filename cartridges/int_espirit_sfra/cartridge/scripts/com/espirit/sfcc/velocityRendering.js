'use strict';

var velocity = require('dw/template/Velocity');
var urlUtils = require('dw/web/URLUtils');

var StringWriter = require('dw/io/StringWriter');

/**
 * Creates a global object needed for rendering
 * @returns {global} Returns a global object
 */
function createGlobal() {
    return {
        include: {
            widget: velocity.remoteInclude,
            staticURL: urlUtils.staticURL
        }
    };
}

/**
 * Renders the given velocity content with global dependencies.
 *
 * @param {string} content The velocity content to render.
 * @returns {string} Returns the rendered velocity content.
 */
function render(content) {
    var writer = new StringWriter();
    velocity.render(content, createGlobal(), writer);
    var renderResult = writer.toString();
    writer.close();
    return renderResult;
}

/**
 * Renders the given velocity content with global dependencies.
 *
 * @param {string} content The velocity content to render.
 * @param {global} customGlobal The custom global rendering dependencies.
 * @returns {string} Returns the rendered velocity content.
 */
function renderCustom(content, customGlobal) {
    var writer = new StringWriter();
    velocity.render(content, customGlobal, writer);
    var renderResult = writer.toString();
    writer.close();
    return renderResult;
}

/**
 * Renders the given velocity content with the product
 * as a dependency.
 *
 * @param {string} content The velocity content to render.
 * @param {string} querystring The querystring of the request.
 * @returns {string} Returns the rendered velocity content.
 */
function renderProduct(content, querystring) {
    if (querystring) {
        var ProductFactory = require('*/cartridge/scripts/factories/product');

        try {
            var global = createGlobal();
            global.product = ProductFactory.get(querystring);
            return this.renderCustom(content, global);
        } catch (e) {
            // Do nothing because we can't handle this error properly
        }
    }

    return null;
}

exports.render = render;
exports.renderCustom = renderCustom;
exports.renderProduct = renderProduct;
