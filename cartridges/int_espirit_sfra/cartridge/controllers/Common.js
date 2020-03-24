'use strict';

/**
 * This controller exports the rendering of
 * various page widgets for Velocity pages.
 */

var server = require('server');
var isml = require('dw/template/ISML');

/**
 * Returns the rendered page header template.
 */
server.get('PageHeader', function () {
    isml.renderTemplate('components/header/pageHeader');
});

/**
 * Returns the rendered page breadcrumb template.
 */
server.get('PageBreadcrumbs', function () {
    isml.renderTemplate('components/breadcrumbs/pageBreadcrumbs');
});

/**
 * Returns the rendered page footer template.
 */
server.get('PageFooter', function () {
    isml.renderTemplate('components/footer/pageFooter');
});

/**
 * Returns the rendered html head template.
 */
server.get('HtmlHead', function () {
    isml.renderTemplate('common/htmlHead');
});

/**
 * Returns the rendered scripts template.
 */
server.get('Scripts', function () {
    isml.renderTemplate('common/scripts');
});

/**
 * Returns the rendered modules template.
 */
server.get('Modules', function () {
    isml.renderTemplate('/components/modules');
});

module.exports = server.exports();
