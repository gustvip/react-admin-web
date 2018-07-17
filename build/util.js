const os = require('os')

/**
 * index.html文件的信息
 * @type {string}
 */
const indexHtmlInfo = `<!doctype html>
<html lang="en">
<head>
	<title>react-exercise</title>
	
	<meta name="keywords" content="@yield('keywords')">
	<meta name="description" content="@yield('description')">
	<meta charset="UTF-8">
	<meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="{$favicon}" title="Favicon">
	<link rel="stylesheet" href="{$publicVendorCSS}">
</head>
<body>
<script type="text/javascript" src="{$envConfJS}"></script>
<script type="text/javascript" src="{$cesiumJS}"></script>
<script type="text/javascript" src="{$publicCommonsJS}"></script>
<script type="text/javascript" src="{$publicRuntimeJS}"></script>
<script type="text/javascript" src="{$publicVendorJS}"></script>
<script type="text/javascript" src="{$publicAppJS}"></script>
</body>
</html>`

function flattenDeep (array) {
	const result = []
	(function fn (_array) {
		_array.forEach(value => {
			Array.isArray(value) ? fn(value) : result.push(value)
		})
	})(array)
	return result
}

/**
 * 获取本机IPv4地址
 * @returns {null}
 */
function getLocalIp () {
	return flattenDeep(Object.values(os.networkInterfaces())).find(value => value.family === 'IPv4' && value.address !== '127.0.0.1' && !value.internal).address
}

module.exports = {
	getLocalIp,
	indexHtmlInfo,
	resourceBaseName: 'resources',
}




