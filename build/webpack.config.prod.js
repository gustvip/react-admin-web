/**
 * @description webpack 生产环境的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resourceBaseName = require('./util').resourceBaseName

module.exports = merge(baseConfig, {
  mode: 'production',
  
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          },
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            
            drop_console: false,
            
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            
            comparisons: false,
          },
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: `${resourceBaseName}/[name].[hash:8].[ext]`,
              limit: 8192,	 // <= 8kb的图片base64内联
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
                speed: 4,
              },
              optipng: {
                progressive: true,
                quality: 70,
                speed: 4,
              },
              pngquant: {
                progressive: true,
                quality: 70,
                speed: 4,
              },
              gifsicle: {
                progressive: true,
                quality: 70,
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
})
