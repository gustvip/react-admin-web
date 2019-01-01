import bubbleSort from '../bubbleSort/index';
import insertionSort from '../insertionSort/index';
import mergeSort from '../mergeSort/index';
import quickSort from '../quickSort/index';
import selectionSort from '../selectionSort/index';
import shellSort from '../shellSort/index';
import Comparator from '../../utils/comparator/index';

describe('sort', () => {
	const sortCollection = [bubbleSort, insertionSort, mergeSort, quickSort, selectionSort, shellSort];
	sortCollection.forEach(sort => {
		it(`sort ${sort.toString()} comparator`, () => {
			expect(sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2], new Comparator())).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
		});
		
		it(`sort ${sort.toString()} small length`, () => {
			expect(sort([1])).toEqual([1]);
		});
		
		it(`sort ${sort.toString()} number`, () => {
			expect(sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
		});
		
		it(`sort ${sort.toString()} string`, () => {
			expect(sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2].map(value => '' + value))).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4].map(value => '' + value));
		});
		
		it(`sort ${sort.toString()} object`, () => {
			const arr = [
				{age: 1},
				{age: 30},
				{age: 20},
				{age: 5},
				{age: 7},
				{age: 25},
			];
			
			function compareCallback (a, b) {
				if (a.age === b.age) {
					return 0;
				}
				return a.age < b.age ? -1 : 1;
			}
			
			expect(sort(arr, compareCallback)).toEqual(
				[
					{age: 1},
					{age: 5},
					{age: 7},
					{age: 20},
					{age: 25},
					{age: 30},
				],
			);
		});
	});
});
