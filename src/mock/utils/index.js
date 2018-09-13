import Mock from "mockjs";

class MockUtil {
	static apiSuccessCode = 0;
	
	/**
	 * 中转
	 * @param {string} url
	 * @param {string} type 请求类型 GET、POST、PUT、DELETE
	 * @param template mockjs的模版
	 */
	request(url, type, template) {
		return Mock.mock(new RegExp(url, "i"), type, {
			code: MockUtil.apiSuccessCode,
			data: template,
			msg: "成功",
		});
	}
	
	/**
	 * 模拟ajax的get请求
	 * @param {string} url
	 * @param template mockjs的模版
	 */
	get(url, template) {
		return this.request(url, "get", template);
	}
	
	/**
	 * 模拟ajax的post请求
	 * @param {string} url
	 * @param template mockjs的模版
	 */
	post(url, template) {
		return this.request(url, "POST", template);
	}
	
	/**
	 * 模拟ajax的put请求
	 * @param {string} url
	 * @param template mockjs的模版
	 */
	put(url, template) {
		return this.request(url, "PUT", template);
	}
	
	/**
	 * 模拟ajax的delete请求
	 * @param {string} url
	 * @param template mockjs的模版
	 */
	delete(url, template) {
		return this.request(url, "DELETE", template);
	}
}

export default new MockUtil();
