/**
 * Created by joey on 2018/10/11
 */

export default function _arrayLikeForEach(data: string | any[] | any, callback: Function): void {
	var i = -1;
	var len = data.length;
	while (++i < len) {
		if (callback(data[i], i, data) === false) {
			return;
		}
	}
}
