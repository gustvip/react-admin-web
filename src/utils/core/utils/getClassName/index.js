import {ToString} from "../constant";

/**
 * 获取对象[[Class]]名称
 * @param x
 * @return {string}
 */
export default function getClassName(x) {
	return ToString.call(x);
}
