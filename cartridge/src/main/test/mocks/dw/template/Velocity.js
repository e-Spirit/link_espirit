'use strict';

module.exports.render = function (content, context, writer) {
    writer.write(content + '_foo');
};
