'use strict';

module.exports.getCategory = function (catId) {
    if (catId === '123') {
        var category = {
            getID: function () { return catId; },
            getDisplayName: function () { return 'category_' + catId; },
            getTemplate: function () { return 'template_' + catId; }
        };

        return category;
    }

    return null;
};
