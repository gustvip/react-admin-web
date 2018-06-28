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
	<meta name="viewport"
				content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	
	<link rel="shortcut icon" href="/favicon.ico" title="Favicon">
	<link rel="stylesheet" href="{$publicVendorCSS}">

</head>
<body>
<script src="https://cdn.bootcss.com/d3/4.13.0/d3.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js"></script>
<script src="https://cdn.bootcss.com/leaflet/1.3.1/leaflet.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/echarts/4.0.4/echarts.min.js"></script>
<script
	src="https://cdn.bootcss.com/react/16.4.0-alpha.0911da3/umd/react.production.min.js"></script>
<script
	src="https://cdn.bootcss.com/react-dom/16.4.0-alpha.0911da3/umd/react-dom.production.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.22.0/moment.min.js"></script>

<script type="text/javascript" src="{$EnvConfJS}"></script>
<script type="text/javascript" src="{$publicCommonsJS}"></script>
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




