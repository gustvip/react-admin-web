/**
 * @description webpack 开发模式下的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  /**
   * 用于生成源代码的mapping
   */
  devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
  
  mode: 'development',
  
  output: {
    publicPath: '/dist/',
    path: `${__dirname}/../dist/`,
    filename: '[name].js',
  },
})
