'use strict';

var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var scriptsFolderPath = '../../../../../../cartridge/int_firstspirit_cms_sfra/cartridge/scripts/com/espirit/sfcc/';
var testRootPath = '../../../../../';

var proxies = {
    'dw/template/Velocity': require(testRootPath + 'mocks/dw/template/Velocity'),
    'dw/web/URLUtils': require(testRootPath + 'mocks/dw/web/URLUtils'),
    'dw/io/StringWriter': require(testRootPath + 'mocks/dw/io/StringWriter')
};

var velocityRendering = proxyquire(scriptsFolderPath + 'VelocityRendering', proxies);

describe('VelocityRendering', function () {
    describe('#render', function () {
        it('should render the input velocity content', function () {
            var velocityContent = 'test';
            var result = velocityRendering.render(velocityContent);
            expect(result).to.eql('test_foo', 'Unexpected rendered content.');
        });
    });
});
