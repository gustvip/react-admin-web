import Comparator from '../../utils/comparator';
import _arrayLikeForEach from '../../utils/aaa/_arrayLikeForEach';

/**
 * @param {*[]} array
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number[]}
 */
export default function linearSearch(array, seekElement, comparatorCallback) {
	var comparator = new Comparator(comparatorCallback);
	var foundIndices = [];
	_arrayLikeForEach(array, function(value, index) {
		if (comparator.equal(value, seekElement)) {
			foundIndices.push(index);
		}
	});
	return foundIndices;
}
