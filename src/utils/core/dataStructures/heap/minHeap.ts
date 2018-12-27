import Heap from './heap';
import {InterfaceMinHeap, InterfaceHeap} from './@types';
import {compareFunctionType} from '../../utils/@types';

export default class MinHeap extends Heap implements InterfaceHeap, InterfaceMinHeap {
	constructor(comparatorFunction?: compareFunctionType) {
		super(comparatorFunction);
	}
	
	// @ts-ignore
	pairIsInCorrectOrder(parentElement, childElement) {
		return this.compare.lessThanOrEqual(parentElement, childElement);
	}
}
