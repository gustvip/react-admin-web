import md5 from 'crypto-js/md5';

class Crypto {
	/**
	 * Md5算法
	 * @param {*} info
	 * @returns {String}
	 */
	md5(info) {
		return md5(String(info)).toString();
	}
}

export default new Crypto();
