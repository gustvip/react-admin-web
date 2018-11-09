/**
 * Created by joey on 2018/10/15
 */
import isFunction from '../isFunction/index';
import { compareFunctionType } from '../@types';

var defaultCompareFunction: compareFunctionType = function(a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? -1 : 1;
};

export default class Comparator {
	constructor(compareFunction?: compareFunctionType | any) {
		this.compare = isFunction(compareFunction) ? compareFunction : defaultCompareFunction;
	}
	
	public compare: compareFunctionType;
	
	public equal(a: any, b: any): boolean {
		return this.compare(a, b) === 0;
	};
	
	public lessThan(a: any, b: any): boolean {
		return this.compare(a, b) < 0;
	};
	
	public greaterThan(a: any, b: any): boolean {
		return this.compare(a, b) > 0;
	};
	
	public lessThanOrEqual(a: any, b: any): boolean {
		return this.lessThan(a, b) || this.equal(a, b);
	};
	
	public greaterThanOrEqual(a: any, b: any): boolean {
		return this.greaterThan(a, b) || this.equal(a, b);
	};
	
	public reverse(): void {
		var compareOriginal = this.compare;
		this.compare = function(a, b) {
			return compareOriginal(b, a);
		};
	};
}
