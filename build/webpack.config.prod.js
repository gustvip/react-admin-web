/**
 * @description webpack 生产环境的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

/**
 * 清除文件
 * @type {CleanWebpackPlugin}
 */
const cleanWebpackPlugin = require('clean-webpack-plugin')

/**
 * 压缩css
 * @type {OptimizeCssAssetsWebpackPlugin}
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * 压缩js
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  
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
  
  plugins: [
    new cleanWebpackPlugin(['public/*.js', 'public/*.map', 'public/*.css ', 'public/resource/*']),
  ],
})
