import checkArray from '../checkArray';

/**
 * 根据值查找路径
 * @param {Array} data
 * @param {*} stopValue 停止的值
 * @param {string} property
 * @param {function} [callback]
 * @return {Array}
 */
function findPath(data, stopValue, property, callback) {
	let tag = false;
	let array = [];
	if (Array.isArray(data)) {
		(function fn(_data, _array) {
			let index = -1;
			while (!tag && ++index < _data.length) {
				const rowData = _data[index];
				const rowArray = _array.slice();
				rowArray.push(callback ? callback(rowData) : rowData[property]);
				if (rowData[property] === stopValue) {
					array = rowArray;
					tag = true;
				} else {
					checkArray(rowData.children) && fn(rowData.children, rowArray.slice());
				}
			}
		}(data, array.slice()));
	}
	return array;
}

export default findPath;
