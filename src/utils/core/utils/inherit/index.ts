import isFunction from "../isFunction/index";
import noop from "../noop/index";

export default function inherit(child: () => any, parent: () => any): () => any {
	if (!isFunction(child) || !isFunction(parent)) {
		throw new TypeError(child + " and " + parent + "must be function");
	}
	noop.prototype = parent.prototype;
	child.prototype = new noop();
	child.prototype.constructor = child;
	return child;
}
