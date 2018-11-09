import Mock from 'mockjs';

class MockUtil {
	static apiSuccessCode = 0;
	
	/**
	 * 中转
	 * @param {string} url
	 * @param {string} type 请求类型 GET、POST、PUT、DELETE
	 * @param template mockjs的模版
	 */
	request(url, type, template = {data: {}}) {
		return Mock.mock(new RegExp(url, 'i'), type, {
			code: MockUtil.apiSuccessCode,
			...template,
			msg: '成功',
		});
	}
	
	/**
	 * 模拟ajax的get请求
	 * @param {string} url
	 * @param template mockjs的模版
	 */
	get(url, template) {
		return this.request(url, 'get', template);
	}
}

export default new MockUtil();
