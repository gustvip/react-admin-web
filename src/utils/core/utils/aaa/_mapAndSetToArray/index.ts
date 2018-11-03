/**
 * Created by joey on 2018/8/25
 */
export default function _mapAndSetToArray(x: Map<any, any> | Set<any>): any[] {
	var result: any[] = [];
	// @ts-ignore
	x.forEach(function(value) {
		result.push(value);
	});
	return result;
}
