import {get} from 'lodash';

/**
 * Ant-design排序
 * @param {Object} prev
 * @param {Object} now
 * @param {String} property
 * @return {number}
 */
function sort({prev, now, property} = {}) {
	const prevValue = get(prev, property);
	const nowValue = get(now, property);
	if (prevValue === nowValue) {
		return 0;
	}
	return prevValue < nowValue ? -1 : 1;
}

export default sort;
