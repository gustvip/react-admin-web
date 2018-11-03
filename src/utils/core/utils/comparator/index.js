/**
 * Created by joey on 2018/10/15
 */
import isFunction from '../isFunction/index';

function defaultCompareFunction(a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? -1 : 1;
}

function Comparator(compareFunction) {
	this.compare = isFunction(compareFunction) ? compareFunction : defaultCompareFunction;
}

Comparator.prototype.equal = function equal(a, b) {
	return this.compare(a, b) === 0;
};

Comparator.prototype.lessThan = function lessThan(a, b) {
	return this.compare(a, b) < 0;
};

Comparator.prototype.greaterThan = function greaterThan(a, b) {
	return this.compare(a, b) > 0;
};

Comparator.prototype.lessThanOrEqual = function lessThanOrEqual(a, b) {
	return this.lessThan(a, b) || this.equal(a, b);
};

Comparator.prototype.greaterThanOrEqual = function greaterThanOrEqual(a, b) {
	return this.greaterThan(a, b) || this.equal(a, b);
};

Comparator.prototype.reverse = function reverse() {
	var compareOriginal = this.compare;
	this.compare = function(a, b) {
		return compareOriginal(b, a);
	};
};

export default function comparator(compareFunction) {
	return new Comparator(compareFunction);
}
