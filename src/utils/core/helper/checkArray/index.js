/**
 * 检测长度大于0的数组或者类数组对象---Array
 * @param {*} x
 * @return {Boolean}
 */
function checkArray(x) {
	return Array.isArray(x) && x.length > 0;
}

export default checkArray;
