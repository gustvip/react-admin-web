/**
 * Created by joey on 2018/6/20
 */

export default function isObject(x?: any): boolean {
	return (typeof x === "object" || typeof x === "function") && x !== null;
}
