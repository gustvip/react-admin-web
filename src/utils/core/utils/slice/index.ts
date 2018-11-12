/**
 * Created by joey on 2018/6/20
 */
import isArray from "../isArray/index";
import _baseSlice from "../aaa/_baseSlice/index";

export default function slice(data?: any, startIndex?: any, endIndex?: any): any[] {
	if (isArray(data) && data.length > 0) {
		return _baseSlice(data, startIndex, endIndex);
	}
	return [];
}
