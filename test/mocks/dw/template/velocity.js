'use strict';

module.exports.render = function (content, context, writer) {
    writer.write(content + '_foo' + (context.product ? '_' + context.product : '') + (context.suffix ? '_' + context.suffix : ''));
};
