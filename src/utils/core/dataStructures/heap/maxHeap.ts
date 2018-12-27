import Heap from './heap';
import {InterfaceMaxHeap} from './@types';
import {compareFunctionType} from '../../utils/@types';

export default class MaxHeap extends Heap implements InterfaceMaxHeap {
	constructor(comparatorFunction?: compareFunctionType) {
		super(comparatorFunction);
	}
	
	// @ts-ignore
	pairIsInCorrectOrder(parentElement, childElement) {
		return this.compare.greaterThanOrEqual(parentElement, childElement);
	}
}
