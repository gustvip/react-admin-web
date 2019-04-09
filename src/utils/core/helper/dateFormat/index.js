import moment from 'moment';

/**
 * 时间格式化
 * @param { Date | Number} date
 * @param {string} template
 * @return {string}
 */
function dateFormat(date = Date.now(), template = 'YYYY-MM-DD HH:mm:ss') {
	return moment(date).format(template);
}

export default dateFormat;
