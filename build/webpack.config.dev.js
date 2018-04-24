/**
 * @description webpack 开发模式下的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  
  mode: 'development',
  
  output: {
    /**
     * 公网发布的目录
     */
    publicPath: '/public/',
    
    /**
     * 编译的目录
     */
    path: `${__dirname}/../public/`,
    filename: '[name].js',
  },
})
