/**
 * Created by joey on 2018/10/11
 */
import { arrayLikeType, arrayLikeCallbackType } from '../../@types';

export default function _arrayLikeForEach(data: arrayLikeType, callback: arrayLikeCallbackType): void {
	var i = -1;
	var len = data.length;
	while (++i < len) {
		if (callback(data[i], i, data) === false) {
			return;
		}
	}
}
