import {render as reactDomRender, unmountComponentAtNode} from 'react-dom';

/**
 * 渲染弹出窗Modal
 * @param {ReactElement} component react组件
 */
function renderModal(component) {
	const domId = '__render-modal-dom-id__';
	const oldDomElement = document.querySelector(`#${domId}`);
	if (oldDomElement) {
		unmountComponentAtNode(oldDomElement);
		document.body.removeChild(oldDomElement);
	}
	const newDomElement = document.createElement('div');
	newDomElement.id = domId;
	document.body.appendChild(newDomElement);
	reactDomRender(component, newDomElement);
}

export default renderModal;
