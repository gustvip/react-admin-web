import sha512 from 'crypto-js/sha512';
import md5 from 'crypto-js/md5';
import hmacSHA512 from 'crypto-js/hmac-sha512';

class Crypto {
	/**
	 * Md5算法
	 * @param {*} info
	 * @returns {String}
	 */
	md5(info) {
		return md5(String(info)).toString();
	}

	/**
	 * Sha512加密
	 * @param {*} info
	 * @returns {String}
	 */
	sha512(info) {
		return sha512(String(info)).toString();
	}

	/**
	 * Hmac-sha512加密算法
	 * @param {*} info
	 * @param {*} key
	 * @returns {String}
	 */
	hmacSHA512(info, key) {
		return hmacSHA512(String(info), String(key)).toString();
	}
}

export default new Crypto();
