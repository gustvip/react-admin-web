import removeTrailingSlash from '../removeTrailingSlash';

/**
 * 连接url
 * @param {string} baseUrl
 * @param {string} relativeUrl
 * @return {string}
 */
function combineUrl(baseUrl, relativeUrl) {
	return relativeUrl ? `${removeTrailingSlash(baseUrl)}/${relativeUrl.replace(/^\/+/, '')}` : baseUrl;
}

export default combineUrl;
