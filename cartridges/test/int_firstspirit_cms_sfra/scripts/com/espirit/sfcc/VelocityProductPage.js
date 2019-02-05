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
    '*/cartridge/scripts/factories/product': require(testRootPath + 'mocks/factories/product'),
    '~/cartridge/scripts/com/espirit/sfcc/VelocityRendering': require(testRootPath + 'mocks/com/espirit/sfcc/VelocityRendering'),
    'dw/content/ContentSearchModel': require(testRootPath + 'mocks/dw/content/ContentSearchModel')
};

var velocityProductPage = proxyquire(scriptsFolderPath + 'VelocityProductPage', proxies);

describe('VelocityProductPage', function () {
    describe('#getVelocityProductDetailPage', function () {
        it('should retrieve content of velocity product detail page', function () {
            var pid = '61235';
            var querystring = '?pid=61235';
            var result = velocityProductPage.getVelocityProductDetailPage(pid, querystring);
            expect(result).to.eql('fs-productdetail-61235_body_foo', 'Unexpected rendered content');
        });
        it('should return false due to missing content asset', function () {
            var pid = '61236';
            var querystring = '?pid=61236';
            var result = velocityProductPage.getVelocityProductDetailPage(pid, querystring);
            expect(result).to.eql(false, 'Unexpected rendered content');
        });
        it('should return false due to missing product', function () {
            var pid = '61237';
            var querystring = '?pid=61237';
            var result = velocityProductPage.getVelocityProductDetailPage(pid, querystring);
            expect(result).to.eql(false, 'Unexpected rendered content');
        });
    });
});
