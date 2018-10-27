import isFunction from '../isFunction';
import noop from '../noop';

/**
 * 继承
 * @param {Function} child
 * @param {Function} parent
 * @return {Function}
 */
export default function inherit(child, parent) {
	if (!isFunction(child) || !isFunction(parent)) {
		throw new TypeError(child + ' and ' + parent + 'must be function');
	}
	noop.prototype = parent.prototype;
	child.prototype = new noop();
	child.prototype.constructor = child;
	return child;
}
