/**
 * Created by joey on 2018/2/18
 */
import isNil from 'lodash/isNil';
import toLength from 'lodash/toLength';

/**
 * 常用正则
 */
const regExpHelper = {
	name(min, max, tag) {
		min = isNil(min) ? 7 : toLength(min);
		max = isNil(max) ? 15 : toLength(max);
		return new RegExp(`^[a-z-A-Z_]\\w{${min},${max}}$`, tag);
	},
	password(min, max, tag) {
		min = isNil(min) ? 6 : toLength(min);
		max = isNil(max) ? 18 : toLength(max);
		return new RegExp(`^\\w{${min},${max}}$`, tag);
	},
	url: /^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\/\w-]*)*\/?$/,
	email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	html: /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/,
	ip: /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/,
	chinese: /[\u4e00-\u9fa5]/,
	telephone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
};
export default regExpHelper;
