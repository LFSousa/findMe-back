let OM = require("objectmodel");

exports.BasicModel = OM.BasicModel;
exports.ObjectModel = OM.ObjectModel;

// Numbers
exports.Integer = this.BasicModel(Number).assert(Number.isInteger).as("Integer");
exports.PositiveNumber = this.BasicModel(Number).assert(function isPositive(n) { return n >= 0 }).as("PositiveNumber");
exports.NegativeNumber = this.BasicModel(Number).assert(function isNegative(n) { return n <= 0 }).as("NegativeNumber");
exports.IntegerMinMax = (min, max) => this.Integer.extend().assert(function isMinMax(n) { return n >= min && n <= max }).as("IntegerMinMax");
exports.PositiveInteger = this.PositiveNumber.extend().assert(Number.isInteger).as("PositiveInteger");
exports.NegativeInteger = this.NegativeNumber.extend().assert(Number.isInteger).as("NegativeInteger");

// Strings
exports.StringNotBlank = this.BasicModel(String).assert(function isNotBlank(str) { return str.trim().length > 0 }).as("StringNotBlank");
exports.NormalizedString = this.BasicModel(String).assert(function isNormalized(str) { return str.normalize() === str }).as("NormalizedString");
exports.TrimmedString = this.BasicModel(String).assert(function isTrimmed(str) { return str.trim() === str }).as("TrimmedString");
exports.StringMinSize = (minSize) => this.BasicModel(String).assert(function isNotBlank(str) { return str.trim().length >= minSize }).as("StringMinSize"+minSize);

// Dates
exports.PastDate = this.BasicModel(Number).assert(function isInThePast(date) { return date < Date.now() }).as("PastDate");
exports.FutureDate = this.BasicModel(Number).assert(function isInTheFuture(date) { return date > Date.now() }).as("FutureDate");

// Arrays
exports.ArrayNotEmpty = this.BasicModel(Array).assert(function isNotEmpty(arr) { return arr.length > 0 }).as("ArrayNotEmpty");
exports.ArrayNotEmptyContentMinSize = min => this.BasicModel(Array).assert(function isNotEmpty(arr) {
	for (let item of arr) {
		if (item.length < min) return false;
	}
	return arr.length > 0
}).as("ArrayNotEmptyContentMinSize");
exports.ArrayUnique = this.BasicModel(Array).assert(function hasNoDuplicates(arr) { return arr.every((x, i) => arr.indexOf(x) === i) }).as("ArrayUnique");

// Others
exports.Email = this.BasicModel(String).assert(function isEmail(str) { return new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(str) }).as("Email");

exports.SealedModel = def => {
	let model = this.ObjectModel(def)
	model.sealed = true;
	model.extend = () => { throw new Error(`Sealed models cannot be extended`); };

	const checkUndeclaredProps = (obj, def, undeclaredProps, path) => {
		Object.keys(obj).map(key => {
			let val = obj[key],
				subpath = path ? path + '.' + key : key
			if (!Object.prototype.hasOwnProperty.call(def, key)) {
				undeclaredProps.push(subpath)
			} else if (val && typeof val === "object" && Object.getPrototypeOf(val) === Object.prototype) {
				checkUndeclaredProps(val, def[key], undeclaredProps, subpath)
			}
		})
	}

	return model.assert(function hasNoUndeclaredProps(obj) {
		if (!model.sealed) return true;
		let undeclaredProps = []
		checkUndeclaredProps(obj, this.definition, undeclaredProps)
		return undeclaredProps.length === 0 ? true : undeclaredProps
	}, undeclaredProps => `Undeclared properties in the sealed model definition: ${undeclaredProps}`)
}
