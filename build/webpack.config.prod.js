/**
 * @description webpack 生产环境的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  
  /**
   * 排除打包的内容---走cdn
   */
  externals: {
    jquery: '$',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    leaflet: 'L',
    echarts: 'echarts',
    moment: 'moment',
  },
  
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  
  output: {
    publicPath: '/static/',
    path: `${__dirname}/../dist/`,
    filename: '[name].js',
  },
  
  plugins: [
    new cleanWebpackPlugin(['dist/*.js', 'dist/*.map', 'dist/*.css ', 'dist/resources/*']),
  ],
})
