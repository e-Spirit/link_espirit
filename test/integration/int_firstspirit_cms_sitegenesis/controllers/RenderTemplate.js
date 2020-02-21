var assert = require('chai').assert;
var request = require('request');
var config = require('../it.config');

describe('RenderTemplate-Product', function () {
    this.timeout(5000);

    var myGetRequest = {
        url: '',
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    it('should return product information', function (done) {
        var prodId = '11736753M';
        var urlEndPoint = config.baseUrl + '/RenderTemplate-Product';
        myGetRequest.url = urlEndPoint + '?prod_id=' + prodId;

        request(myGetRequest, function (error, response) {
            assert.equal(response.statusCode, 200, 'Expected statusCode to be 200.');

            var bodyAsJson = JSON.parse(response.body);

            assert.equal(bodyAsJson.id, prodId);
            assert.equal(bodyAsJson.name, 'Summer Bomber Jacket');
            assert.equal(bodyAsJson.template, 'templateForIntegrationTests');
            assert.equal(bodyAsJson.type, 'product');

            done();
        });
    });

    it('should return product information without template', function (done) {
        var prodId = '25518447M';
        var urlEndPoint = config.baseUrl + '/RenderTemplate-Product';
        myGetRequest.url = urlEndPoint + '?prod_id=' + prodId;

        request(myGetRequest, function (error, response) {
            assert.equal(response.statusCode, 200, 'Expected statusCode to be 200.');

            var bodyAsJson = JSON.parse(response.body);

            assert.equal(bodyAsJson.id, prodId);
            assert.equal(bodyAsJson.name, 'Quilted Jacket');
            assert.isNull(bodyAsJson.template);
            assert.equal(bodyAsJson.type, 'product');

            done();
        });
    });

    it('should return product not found', function (done) {
        var prodId = '255187M';
        var urlEndPoint = config.baseUrl + '/RenderTemplate-Product';
        myGetRequest.url = urlEndPoint + '?prod_id=' + prodId;

        request(myGetRequest, function (error, response) {
            assert.equal(response.statusCode, 200, 'Expected statusCode to be 200.');

            var bodyAsJson = JSON.parse(response.body);

            assert.isTrue(bodyAsJson.error);
            assert.equal(bodyAsJson.message, 'product not found for ' + prodId);

            done();
        });
    });
});

describe('RenderTemplate-Category', function () {
    this.timeout(5000);

    var myGetRequest = {
        url: '',
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    it('should return category information', function (done) {
        var catId = 'womens-outfits';
        var urlEndPoint = config.baseUrl + '/RenderTemplate-Category';
        myGetRequest.url = urlEndPoint + '?cat_id=' + catId;

        request(myGetRequest, function (error, response) {
            assert.equal(response.statusCode, 200, 'Expected statusCode to be 200.');

            var bodyAsJson = JSON.parse(response.body);

            assert.equal(bodyAsJson.id, catId);
            assert.equal(bodyAsJson.name, 'Outfits');
            assert.equal(bodyAsJson.template, 'rendering/category/categoryproducthits');
            assert.equal(bodyAsJson.type, 'category');

            done();
        });
    });

    it('should return category not found', function (done) {
        var catId = 'women';
        var urlEndPoint = config.baseUrl + '/RenderTemplate-Category';
        myGetRequest.url = urlEndPoint + '?cat_id=' + catId;

        request(myGetRequest, function (error, response) {
            assert.equal(response.statusCode, 200, 'Expected statusCode to be 200.');

            var bodyAsJson = JSON.parse(response.body);

            assert.isTrue(bodyAsJson.error);
            assert.equal(bodyAsJson.message, 'category not found for ' + catId);

            done();
        });
    });
});
