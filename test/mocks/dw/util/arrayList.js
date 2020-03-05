'use strict';

function ArrayList() {
    this.items = [];
}

ArrayList.prototype.add = function (item) {
    this.items.push(item);
};

module.exports = ArrayList;
