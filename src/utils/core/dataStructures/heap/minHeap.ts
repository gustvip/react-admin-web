import Heap from './heap';
import {InterfaceMinHeap, InterfaceHeap} from './@types';
import {compareFunctionType} from '../../utils/@types';
import Comparator from '../../utils/comparator/index';

export default class MinHeap extends Heap implements InterfaceHeap, InterfaceMinHeap {
	constructor(comparatorFunction?: Comparator | compareFunctionType) {
		super(comparatorFunction);
	}
	
	pairIsInCorrectOrder(parentElement, childElement) {
		return this.compare.lessThanOrEqual(parentElement, childElement);
	}
}
