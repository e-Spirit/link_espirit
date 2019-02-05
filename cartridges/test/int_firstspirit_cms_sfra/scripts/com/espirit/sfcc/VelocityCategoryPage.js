'use strict';

var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var scriptsFolderPath = '../../../../../../cartridge/int_firstspirit_cms_sfra/cartridge/scripts/com/espirit/sfcc/';
var scriptsFolderPathCore = '../../../../../../cartridge/int_firstspirit_cms_core/cartridge/scripts/com/espirit/sfcc/';
var testRootPath = '../../../../../';

var proxies = {
    'dw/template/Velocity': require(testRootPath + 'mocks/dw/template/Velocity'),
    'dw/web/URLUtils': require(testRootPath + 'mocks/dw/web/URLUtils'),
    'dw/io/StringWriter': require(testRootPath + 'mocks/dw/io/StringWriter'),
    '*/cartridge/scripts/com/espirit/sfcc/Constants': require(scriptsFolderPathCore + 'Constants'),
    'dw/system/Logger': require(testRootPath + 'mocks/dw/system/Logger'),
    'dw/content/ContentMgr': require(testRootPath + 'mocks/dw/content/ContentMgr'),
    '~/cartridge/scripts/com/espirit/sfcc/VelocityRendering': require(testRootPath + 'mocks/com/espirit/sfcc/VelocityRendering')
};

var velocityCategoryPage = proxyquire(scriptsFolderPath + 'VelocityCategoryPage', proxies);

describe('VelocityCategoryPage', function () {
    describe('#buildParametersString', function () {
        it('should build a parameters string from the passed http query string', function () {
            var httpQueryString = '?cgid=mens&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.buildParametersString(httpQueryString);
            expect(result).to.eql(",'cgid','mens','ref1','Blue','ref2','Red'", 'Unexpected rendered content');
        });
    });
    describe('#renderCategorySearchResults', function () {
        it('should render the category search results with the given http query string', function () {
            var httpQueryString = '?cgid=mens&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.renderCategorySearchResults(httpQueryString);
            expect(result).to.eql("$include.widget('CategorySearchResult-Show','cgid','mens','ref1','Blue','ref2','Red')_foo", 'Unexpected rendered content');
        });
    });
    describe('#getVelocityCategoryPage', function () {
        it('should retrieve content of velocity category page', function () {
            var cgid = 'mens';
            var querystring = '?cgid=mens&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.getVelocityCategoryPage(cgid, querystring);
            expect(result).to.eql('fs-categorydetail-mens_body_foo', 'Unexpected rendered content');
        });
        it('should return false due to missing content asset', function () {
            var cgid = 'mens-unknown';
            var querystring = '?cgid=mens-unknown&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.getVelocityCategoryPage(cgid, querystring);
            expect(result).to.eql(false, 'Unexpected rendered content');
        });
    });
});
