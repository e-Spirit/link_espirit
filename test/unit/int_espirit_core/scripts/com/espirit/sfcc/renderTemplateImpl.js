'use strict';

var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var scriptsFolderPath = '../../../../../../../cartridges/int_espirit_core/cartridge/scripts/com/espirit/sfcc/';
var testRootPath = '../../../../../../';

var proxies = {
    'dw/catalog/ProductSearchModel': require(testRootPath + 'mocks/dw/catalog/productSearchModel'),
    'dw/util/ArrayList': require(testRootPath + 'mocks/dw/util/arrayList')
};

var renderTemplateImpl = proxyquire(scriptsFolderPath + 'renderTemplateImpl', proxies);

describe('renderTemplateImpl', function () {
    describe('#getProductTemplate', function () {
        it('should return product template data', function () {
            var prodId = '123';
            var result = renderTemplateImpl.getProductTemplate(prodId);
            expect(result).to.eql({
                'id': prodId,
                'name': 'product_' + prodId,
                'template': 'template_' + prodId,
                'type': 'product'
            }, 'Unexpected result.');
        });

        it('should return error message for product not found', function () {
            var prodId = '1234';
            var result = renderTemplateImpl.getProductTemplate(prodId);
            expect(result).to.eql({
                'error': true,
                'message': 'product not found for ' + prodId
            }, 'Unexpected result.');
        });

        it('should return error message for missing product id', function () {
            var result = renderTemplateImpl.getProductTemplate(null);
            expect(result).to.eql({
                'error': true,
                'message': 'product id missing'
            }, 'Unexpected result.');
        });
    });

    describe('#getCategoryTemplate', function () {
        it('should return category template data', function () {
            var catId = '123';
            var result = renderTemplateImpl.getCategoryTemplate(catId);
            expect(result).to.eql({
                'id': catId,
                'name': 'category_' + catId,
                'template': 'template_' + catId,
                'type': 'category'
            }, 'Unexpected result.');
        });

        it('should return error message for category not found', function () {
            var catId = '1234';
            var result = renderTemplateImpl.getCategoryTemplate(catId);
            expect(result).to.eql({
                'error': true,
                'message': 'category not found for ' + catId
            }, 'Unexpected result.');
        });

        it('should return error message for missing category id', function () {
            var result = renderTemplateImpl.getCategoryTemplate(null);
            expect(result).to.eql({
                'error': true,
                'message': 'category id missing'
            }, 'Unexpected result.');
        });
    });
});
