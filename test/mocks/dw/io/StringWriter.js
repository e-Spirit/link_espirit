'use strict';

function StringWriter() {
    this.string = '';
}

StringWriter.prototype.close = function () {};
StringWriter.prototype.toString = function () { return this.string; };
StringWriter.prototype.write = function (string) { this.string += string; };

module.exports = StringWriter;
