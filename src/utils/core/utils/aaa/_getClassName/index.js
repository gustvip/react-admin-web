/**
 * 获取对象[[Class]]名称
 * @private
 * @param x
 * @return {string}
 */
export default function _getClassName(x) {
	return Object.prototype.toString.call(x);
}
