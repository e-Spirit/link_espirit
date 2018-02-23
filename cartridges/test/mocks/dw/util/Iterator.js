'use strict';

function Iterator(items) {
    if (Array.isArray(items)) {
        this.items = items;
    } else {
        throw new Error("Parameter 'items' must be an array.");
    }
}

Iterator.prototype.hasNext = function () {
    return this.items.length > 0;
};

Iterator.prototype.next = function () {
    return this.items.shift();
};

module.exports = Iterator;
