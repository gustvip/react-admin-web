import {compareFunctionType} from '../../@types';

type compare = (a?: any, b?: any) => boolean;

export default interface InterfaceComparator {
	compare: compareFunctionType,
	equal: compare,
	lessThan: compare,
	greaterThan: compare,
	lessThanOrEqual: compare,
	greaterThanOrEqual: compare,
	reverse: () => this,
}
