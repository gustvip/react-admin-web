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

/**
 * css-loader less-loader scss-loader 公共
 * @param otherLoader
 * @return {*[]}
 */
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
          require('autoprefixer')({flexbox: 'no-2009'}),
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

/**
 * 静态资源
 */
const staticResource = (function () {
  const resourceBaseName = 'resources'
  
  return [
    {
      test: /\.(png|jpg|gif)$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=8192`, //  <= 8kb的图片base64内联
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10000&minetype=application/font-woff`,
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/font-woff`,
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/octet-stream`,
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
    },
    {
      test: /\.(txt|doc|docx|swf)$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=image/svg+xml`,
    },
  ]
})()

module.exports = {
  optimization: {
    splitChunks: {
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
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'commons', // 要缓存的 分隔出来的 chunk 名称
          minChunks: 2,
          minSize: 0,
          priority: 1,
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
      'utils/t',
      'es6-promise',
      'url-search-params-polyfill',
    ],
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
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
      React: 'react',
      $: 'jquery',
      jquery: 'jquery',
    }),
  ],
}
