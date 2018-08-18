/**
 * @description postcss配置
 */

module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-cssnext'),
		require('postcss-flexbugs-fixes'),
		require('cssnano'),
	],
};
