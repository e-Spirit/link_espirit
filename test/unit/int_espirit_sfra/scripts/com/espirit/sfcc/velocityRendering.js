'use strict';

var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var scriptsFolderPath = '../../../../../../../cartridges/int_espirit_sfra/cartridge/scripts/com/espirit/sfcc/';
var testRootPath = '../../../../../../';

var proxies = {
    'dw/template/Velocity': require(testRootPath + 'mocks/dw/template/velocity'),
    'dw/web/URLUtils': require(testRootPath + 'mocks/dw/web/urlUtils'),
    'dw/io/StringWriter': require(testRootPath + 'mocks/dw/io/stringWriter'),
    '*/cartridge/scripts/factories/product': require(testRootPath + 'mocks/factories/product')
};

var velocityRendering = proxyquire(scriptsFolderPath + 'velocityRendering', proxies);

describe('VelocityRendering', function () {
    describe('#render', function () {
        it('should render the input velocity content', function () {
            var velocityContent = 'test';
            var result = velocityRendering.render(velocityContent);
            expect(result).to.eql('test_foo', 'Unexpected rendered content.');
        });
    });
    describe('#renderCustom', function () {
        it('should render the input velocity content with custom global rendering dependencies', function () {
            var velocityContent = 'test';
            var customGlobal = { suffix: 'bar' };
            var result = velocityRendering.renderCustom(velocityContent, customGlobal);
            expect(result).to.eql('test_foo_bar', 'Unexpected rendered content.');
        });
    });
    describe('#renderProduct', function () {
        it('should render the input velocity content with the product as a dependency', function () {
            var velocityContent = 'test';
            var querystring = '?pid=61236';
            var result = velocityRendering.renderProduct(velocityContent, querystring);
            expect(result).to.eql('test_foo_product', 'Unexpected rendered content.');
        });
        it('should render the input velocity content despite a missing product', function () {
            var velocityContent = 'test';
            var querystring = '?pid=61237';
            var result = velocityRendering.renderProduct(velocityContent, querystring);
            expect(result).to.eql('test_foo', 'Unexpected rendered content.');
        });
        it('should return null due to missing querystring', function () {
            var velocityContent = 'test';
            var result = velocityRendering.renderProduct(velocityContent);
            expect(result).to.eql(null, 'Unexpected rendered content.');
        });
    });
});
