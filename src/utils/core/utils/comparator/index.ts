/**
 * Created by joey on 2018/10/15
 */
import {compareFunctionType} from '../@types';
import InterfaceComparator from './@types';

const defaultCompareFunction: compareFunctionType = function (a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? -1 : 1;
};

export default class Comparator implements InterfaceComparator {
	constructor(compareFunction?: compareFunctionType) {
		this.compare = typeof compareFunction === "function" ? compareFunction : defaultCompareFunction;
	}
	
	public compare: compareFunctionType;
	
	public equal(a, b) {
		return this.compare(a, b) === 0;
	};
	
	public lessThan(a, b) {
		return this.compare(a, b) < 0;
	};
	
	public greaterThan(a, b) {
		return this.compare(a, b) > 0;
	};
	
	public lessThanOrEqual(a, b) {
		return this.lessThan(a, b) || this.equal(a, b);
	};
	
	public greaterThanOrEqual(a, b) {
		return this.greaterThan(a, b) || this.equal(a, b);
	};
	
	public reverse() {
		const compareOriginal = this.compare;
		this.compare = function (a, b) {
			return compareOriginal(b, a);
		};
		return this;
	};
}
