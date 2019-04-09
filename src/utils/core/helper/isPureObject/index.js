/**
 * 是否为纯的对象
 * @param {*} x
 * @return {boolean}
 */
function isPureObject(x) {
	return Object.prototype.toString.call(x) === '[object Object]';
}

export default isPureObject;
