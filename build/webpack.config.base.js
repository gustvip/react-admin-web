/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.jsx?|index.tsx?)$/ig

/**
 * 编译排除的文件
 * @type {RegExp}
 */
const excludeRegex = /(node_modules|bower_modules)/

/**
 * 自定义antd的样式
 */
const customAntdStyle = {
  '@text-color': '#333',                  // 修改字体基本颜色
  '@border-color-base': '#a3babf',				// 更改border颜色
  '@primary-color': '#00d9ca',		            // 更改antd的主题颜色;
  '@font-size-base': '12px',                      // 修改基础字体大小
}

const formatStyleLoader = (otherLoader) => {
  const baseLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('autoprefixer')({
            browsers: [
              'last 5 Chrome versions',
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ]
  
  if (otherLoader) {
    /**
     * 针对scss进行css-module处理---项目用scss
     */
    if (otherLoader.loader === 'sass-loader') {
      baseLoaders[0] = {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      }
    }
    
    baseLoaders.push(otherLoader)
  }
  baseLoaders.unshift(MiniCssExtractPlugin.loader)
  
  return baseLoaders
}

const staticResource = (function () {
  const staticResourceBaseName = 'staticResource'
  
  return [
    {
      test: /\.(png|jpg|gif)$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]&limit=8192` //  <= 8kb的图片base64内联
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]&limit=10000&minetype=application/font-woff`,
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/font-woff`,
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/octet-stream`,
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]`,
    },
    {
      test: /\.(txt|doc|docx|swf)$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]`,
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${staticResourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=image/svg+xml`,
    },
  ]
})()

module.exports = {
  /**
   * 用于生成源代码的mapping
   */
  devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        styles: {
          name: 'vendor',
          test: /\.scss|css|less$/,
          chunks: 'all',    // merge all the css chunk to one file
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        
        commons: { // key 为entry中定义的 入口名称
          chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'commons', // 要缓存的 分隔出来的 chunk 名称
          minSize: 0,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 1, // 最大异步请求数， 默认1
          maxInitialRequests: 1, // 最大初始化请求书，默认1
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        },
      },
    },
    
    runtimeChunk: {
      name: 'runtime',
    },
  },
  
  entry: {
    app: ['./src/index'],
    commons: [
      'utils/T',
      'es6-promise',
      'url-search-params-polyfill',
    ],
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'scss'],
    modules: ['node_modules', 'web_modules', './src'],
  },
  
  module: {
    rules: [
      ...staticResource,
      {
        test: /\.css$/,
        use: formatStyleLoader(),
      },
      {
        test: /\.scss/,
        exclude: excludeRegex,
        use: formatStyleLoader({
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }),
      },
      
      {
        test: /\.less/,
        use: formatStyleLoader({
          loader: 'less-loader',
          options: {
            sourceMap: true,
            modifyVars: customAntdStyle,
          },
        }),
      },
      
      {
        test: routesComponentsRegex,
        exclude: excludeRegex,
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
            },
          },
        ],
      },
      
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          excludeRegex,
          routesComponentsRegex,
        ],
      },
      
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [
          excludeRegex,
          routesComponentsRegex,
        ],
      },
    ],
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    
    new webpack.ProvidePlugin({
      React: 'react'
    }),
  ],
}
