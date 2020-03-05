'use strict';

var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var scriptsFolderPath = '../../../../../../../cartridges/int_firstspirit_cms_sfra/cartridge/scripts/com/espirit/sfcc/';
var scriptsFolderPathCore = '../../../../../../../cartridges/int_firstspirit_cms_core/cartridge/scripts/com/espirit/sfcc/';
var testRootPath = '../../../../../../';

var proxies = {
    'dw/template/Velocity': require(testRootPath + 'mocks/dw/template/velocity'),
    'dw/web/URLUtils': require(testRootPath + 'mocks/dw/web/urlUtils'),
    'dw/io/StringWriter': require(testRootPath + 'mocks/dw/io/stringWriter'),
    '*/cartridge/scripts/com/espirit/sfcc/constants': require(scriptsFolderPathCore + 'constants'),
    'dw/system/Logger': require(testRootPath + 'mocks/dw/system/logger'),
    'dw/content/ContentMgr': require(testRootPath + 'mocks/dw/content/contentMgr'),
    '~/cartridge/scripts/com/espirit/sfcc/velocityRendering': require(testRootPath + 'mocks/com/espirit/sfcc/velocityRendering')
};

var velocityCategoryPage = proxyquire(scriptsFolderPath + 'velocityCategoryPage', proxies);

describe('velocityCategoryPage', function () {
    describe('#buildParametersString', function () {
        it('should build a parameters string from the passed http query string including the leading question mark', function () {
            var httpQueryString = '?cgid=mens&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.buildParametersString(httpQueryString);
            expect(result).to.eql(",'cgid','mens','ref1','Blue','ref2','Red'", 'Unexpected rendered content');
        });
        it('should build a parameters string from the passed http query string without leading question mark', function () {
            var httpQueryString = 'cgid=mens&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.buildParametersString(httpQueryString);
            expect(result).to.eql(",'cgid','mens','ref1','Blue','ref2','Red'", 'Unexpected rendered content');
        });
        it('should build a parameters string from the passed http query string with empty parameter', function () {
            var httpQueryString = 'cgid=mens&ref1=&ref2=Red';
            var result = velocityCategoryPage.buildParametersString(httpQueryString);
            expect(result).to.eql(",'cgid','mens','ref1','','ref2','Red'", 'Unexpected rendered content');
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
        it('should return false due to missing category id', function () {
            var cgid;
            var querystring = '?cgid=mens-unknown&ref1=Blue&ref2=Red';
            var result = velocityCategoryPage.getVelocityCategoryPage(cgid, querystring);
            expect(result).to.eql(false, 'Unexpected rendered content');
        });
    });
});
