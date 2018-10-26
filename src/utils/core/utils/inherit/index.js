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
		throw new TypeError(child + 'and' + parent + 'must be function');
	}
	noop.prototype = new parent();
	child.prototype = noop.prototype;
	child.prototype.constructor = child;
	return child;
}
