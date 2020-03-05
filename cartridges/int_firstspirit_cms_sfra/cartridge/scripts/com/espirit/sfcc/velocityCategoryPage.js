'use strict';

var constants = require('*/cartridge/scripts/com/espirit/sfcc/constants');
var logger = require('dw/system/Logger').getLogger(constants.LOGFILE_PREFIX, 'com.espirit.sfcc.velocityCategoryPage');
var velocity = require('dw/template/Velocity');
var urlUtils = require('dw/web/URLUtils');
var contentManager = require('dw/content/ContentMgr');
var velocityRendering = require('~/cartridge/scripts/com/espirit/sfcc/velocityRendering');

var StringWriter = require('dw/io/StringWriter');

var CATEGORY_DETAIL_PAGE_CA_PREFIX = 'fs-categorydetail-';

/**
 * Creates a global object needed for rendering
 * @returns {global} Returns a global object
 */
function createGlobal() {
    return {
        include: {
            widget: velocity.remoteInclude,
            staticURL: urlUtils.staticURL
        },
        action: 'Search-Show'
    };
}

/**
* Builds a string containing all query parameters as a parameter list.
*
* @param {string} queryString The query string to parse.
* @returns {string} Returns the built string.
*/
function buildParametersString(queryString) {
    var parametersString = '';
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i += 1) {
        var pair = pairs[i].split('=');
        parametersString += ",'" + decodeURIComponent(pair[0]) + "','" + decodeURIComponent(pair[1] || '') + "'";
    }
    return parametersString;
}

/**
* Renders a category search result with the given query string.
*
* @param {string} queryString The query string to use.
* @returns {string} Returns the rendering results.
*/
function renderCategorySearchResults(queryString) {
    var writer = new StringWriter();
    var parametersString = buildParametersString(queryString);
    velocity.render("$include.widget('CategorySearchResult-Show'" + parametersString + ')', { include: { widget: velocity.remoteInclude } }, writer);
    var renderResult = writer.toString();
    writer.close();
    return renderResult;
}

/**
* Checks whether a category detail page (content asset) exists for the given category id
* and renders a category search result which will be passed to the velocity rendering
* of the body of the content asset.
*
* @param {string} cgid The id of the category.
* @param {string} queryString The query string to use.
* @returns {(string|boolean)} Returns the rendered category detail page if found,
*                             otherwise returns false.
*/
function getVelocityCategoryPage(cgid, queryString) {
    if (cgid) {
        var categoryContentAsset = contentManager.getContent(CATEGORY_DETAIL_PAGE_CA_PREFIX + cgid);
        if (categoryContentAsset) {
            logger.debug('Content asset for category ' + cgid + ' found.');
            logger.debug('Rendering search results.');

            // Include the rendered category search result as a velocity rendering parameter
            var global = createGlobal();
            global.categorySearchResult = renderCategorySearchResults(queryString);
            global.querystring = queryString;

            logger.debug('Rendering content asset body.');
            return velocityRendering.renderCustom(categoryContentAsset.custom.body, global);
        }
    }

    return false;
}

exports.getVelocityCategoryPage = getVelocityCategoryPage;
/* test-code */
exports.buildParametersString = buildParametersString;
exports.renderCategorySearchResults = renderCategorySearchResults;
/* end-test-code */
