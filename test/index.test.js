"use strict";

var assert    = require("chai").assert
  , uniGlobal = require("..");

var isObject = require("type/object/is");

describe("index.js", function () {
	it("should return object for namespace", function () {
		assert.equal(isObject(uniGlobal("foo")), true);
	});
	it("should return same object for same namspace", function () {
		assert.equal(uniGlobal("foo"), uniGlobal("foo"));
	});
	it("should return different object for different namspace", function () {
		assert.notEqual(uniGlobal("foo"), uniGlobal("bar"));
	});
});
