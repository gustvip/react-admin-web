/**
 * Created by joey on 2018/6/20
 */
import isFunction from "../isFunction";

function defaultCompareFunction(a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? -1 : 1;
}

function equal(a, b) {
	return this.compare(a, b) === 0;
}

function lessThan(a, b) {
	return this.compare(a, b) < 0;
}

function greaterThan(a, b) {
	return this.compare(a, b) > 0;
}

function lessThanOrEqual(a, b) {
	return this.lessThan(a, b) || this.equal(a, b);
}

function greaterThanOrEqual(a, b) {
	return this.greaterThan(a, b) || this.equal(a, b);
}

function reverse() {
	let compareOriginal = this.compare;
	this.compare = function(a, b) {
		return compareOriginal(b, a);
	};
}

Object.defineProperties(Comparator.prototype, {
	constructor: {
		value: Comparator,
		configuarable: false,
	},
	equal: {
		value: equal,
		configuarable: false,
	},
	lessThan: {
		value: lessThan,
		configuarable: false,
	},
	greaterThan: {
		value: greaterThan,
		configuarable: false,
	},
	lessThanOrEqual: {
		value: lessThanOrEqual,
		configuarable: false,
	},
	greaterThanOrEqual: {
		value: greaterThanOrEqual,
		configuarable: false,
	},
	reverse: {
		value: reverse,
		configuarable: false,
	},
});

function Comparator(compareFunction) {
	this.compare = isFunction(compareFunction) ? compareFunction : defaultCompareFunction;
}

export default function comparator(compareFunction) {
	return new Comparator(compareFunction);
}
