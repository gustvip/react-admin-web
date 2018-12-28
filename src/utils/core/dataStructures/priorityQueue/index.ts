import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator';
import {InterfacePriority} from './@types';

export default class PriorityQueue implements InterfacePriority {
	constructor() {
		this.compareValue = new Comparator(function (a, b) {
			if (a.value === b.value) {
				return 0;
			}
			return a.value < b.value ? -1 : 1;
		});
		this.minHeap = new MinHeap(function (a, b) {
			if (a.priority === b.priority) {
				return 0;
			}
			return a.priority < b.priority ? -1 : 1;
		});
	}
	
	public compareValue;
	public minHeap;
	
	public add(value, priority = 0) {
		this.minHeap.add({value, priority});
		return this;
	}
	
	public remove(value) {
		this.minHeap.remove({value}, this.compareValue);
		return this;
	}
	
	public changePriority(value, priority) {
		if (this.hasValue(value)) {
			this.minHeap.remove({value}, this.compareValue);
			this.add(value, priority);
		}
		
		return this;
	}
	
	public hasValue(value) {
		return this.minHeap.findIndex({value}, this.compareValue) !== -1;
	}
}
