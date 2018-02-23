'use strict';

function CatalogItem(id, name, template) {
    this.id = id;
    this.name = name;
    this.template = template;
}

CatalogItem.prototype.getID = function () {
    return this.id;
};

CatalogItem.prototype.getName = function () {
    return this.name;
};

CatalogItem.prototype.getDisplayName = function () {
    return this.name;
};

CatalogItem.prototype.getTemplate = function () {
    return this.template;
};

module.exports = CatalogItem;
