'use strict';

var velocity = require('dw/template/Velocity');
var urlUtils = require('dw/web/URLUtils');

var StringWriter = require('dw/io/StringWriter');

var global = {
    include: {
        widget: velocity.remoteInclude,
        staticURL: urlUtils.staticURL
    }
};

/**
* Renders the given velocity content with global dependencies.
*
* @param {string} content The velocity content to render.
* @returns {string} Returns the rendered velocity content.
*/
function render(content) {
    var writer = new StringWriter();
    velocity.render(content, global, writer);
    return writer.toString();
}

exports.render = render;
