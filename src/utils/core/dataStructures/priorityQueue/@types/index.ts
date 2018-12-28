import InterfaceComparator from '../../../utils/comparator/@types';
import {InterfaceHeap} from "../../heap/@types";

export interface InterfacePriority {
	compareValue: InterfaceComparator
	minHeap: InterfaceHeap
	add: (value?: any, priority?: number) => this
	remove: (value?: any) => this
	hasValue: (value?: any) => boolean
}
