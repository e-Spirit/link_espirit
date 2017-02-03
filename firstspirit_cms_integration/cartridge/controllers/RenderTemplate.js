"use strict";

function getProduct () {
	var parameters = request.getHttpParameters();
	
	var result = {};
	if (parameters.containsKey("prod_id")) {
		var prod_id = request.getHttpParameterMap().get("prod_id");
		var productManager = require("dw/catalog/ProductMgr");
		
		var product = productManager.getProduct(prod_id);
		
		if (product != null) {
			result.id = product.getID();
			result.name = product.getName();
			result.template = product.getTemplate();
			result.type = "product";
		} else {
			result.error = true;
			result.message = "product not found for " + prod_id;
		}
	} else {
		result.error = true;
		result.message = "product id missing";
	}
	
	response.setContentType("application/json");
	response.getWriter().print(JSON.stringify(result));
}

function getCategory () {
	var parameters = request.getHttpParameters();
	
	var result = {};
	if (parameters.containsKey("cat_id")) {
		var cat_id = request.getHttpParameterMap().get("cat_id");
		var catalogManager = require("dw/catalog/CatalogMgr");
		
		var category = catalogManager.getCategory(cat_id);
		
		if (category != null) {
			result.id = category.getID();
			result.name = category.getDisplayName();
			result.template = category.getTemplate();
			result.type = "category";
		} else {
			result.error = true;
			result.message = "category not found for " + cat_id;
		}
	} else {
		result.error = true;
		result.message = "category id missing";
	}
	
	response.setContentType("application/json");
	response.getWriter().print(JSON.stringify(result));
}

exports.Category = getCategory;
exports.Product = getProduct;

exports.Category.public = true;
exports.Product.public = true;
