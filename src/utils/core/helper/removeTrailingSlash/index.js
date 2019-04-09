/**
 * 去除尾部下划线
 * @param {string} x
 * @return string
 */
function removeTrailingSlash(x) {
	return x.replace(/\/+$/g, '');
}

export default removeTrailingSlash;
