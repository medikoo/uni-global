"use strict";

var assert          = require("chai").assert
  , globalThis      = require("ext/global-this")
  , requireUncached = require("ncjsm/require-uncached")
  , adaptRealm      = require("../adapt-realm");

var uniGlobal = require("..");

describe("adapt-realm.js", function () {
	it("should adapt outer realm to share same uni global", function () {
		var otherRealmGlobal = { EvalError: function () { /* noop */ } };
		adaptRealm(otherRealmGlobal);
		var otherRealmUniGlobal = requireUncached(function () {
			var originalEvalError = EvalError;
			globalThis.EvalError = otherRealmGlobal.EvalError;
			try { return require(".."); } finally { globalThis.EvalError = originalEvalError; }
		});
		assert.equal(uniGlobal("foo"), otherRealmUniGlobal("foo"));
	});

	it("Adapting same realm twice should be ineffective", function () {
		var otherRealmGlobal = { EvalError: function () { /* noop */ } };
		adaptRealm(otherRealmGlobal);
		adaptRealm(otherRealmGlobal);
	});
});
