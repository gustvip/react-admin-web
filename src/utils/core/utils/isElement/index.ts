/**
 * Created by joey on 2018/6/20
 */

import isPlainObject from "../isPlainObject/index";

export default function isElement(x?: any): boolean {
	return x && x.nodeType === 1 && !isPlainObject(x);
}
