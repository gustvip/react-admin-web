/**
 * Created by joey on 2018/02/19
 */

import {Modal} from "antd";
import {message} from "antd";

import noop from "lodash/noop";
import merge from "lodash/merge";

class Prompt {
	constructor() {
		message.config({
			duration: 2,
		});
	}
	
	/**
	 * 提示成功
	 * @param {String} msg
	 * @param {Number} duration
	 * @param {Function} onClose
	 */
	success(msg, duration = 2, onClose = noop) {
		message.success(msg, duration, onClose);
	}
	
	/**
	 * 提示错误
	 * @param {String} msg
	 * @param {Number} duration
	 * @param {Function} onClose
	 */
	error(msg, duration = 2, onClose = noop) {
		message.error(msg, duration, onClose);
	}
	
	/**
	 * 提示警告
	 * @param {String} msg
	 * @param {Number} duration
	 * @param {Function} onClose
	 */
	warn(msg, duration = 2, onClose = noop) {
		message.warn(msg, duration, onClose);
	}
	
	/**
	 * 确认提示框
	 * @param {Object} options
	 */
	confirm(options = {}) {
		options = merge({
			title: "确定删除吗？",
			content: "", // Content可以是react节点实例
			okText: "确定",
			cancelText: "取消",
			onCancel: noop,
			onOk: noop,
		}, options);
		
		return Modal.confirm(options);
	}
}

export default new Prompt();
