/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happyPack = require('happypack')

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.jsx?)$/ig
const excludeRegex = /node_modules/
const customAntdStyle = {
  '@text-color': '#333',                  // 修改字体基本颜色
  '@font-size-base': '12px',                      // 修改基础字体大小
}

const staticResource = (function () {
  const resourceBaseName = require('./util').resourceBaseName
  
  return [
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
      test: /\.(csv|tsv)$/,
      use: 'csv-loader',
    },
  ]
})()

const formatStyleLoader = (otherLoader) => {
  const baseLoaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
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
        ...require('./util').postCssPlugin,
      },
    },
  ]
  
  if (otherLoader) {
    if (otherLoader.loader === 'sass-loader') {
      baseLoaders[1] = {
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
  
  return baseLoaders
}

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /\.scss|css|less$/,
          chunks: 'all',    // merge all the css chunk to one file
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
          priority: 0,
        },
        
        commons: { // key 为entry中定义的 入口名称
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'commons', // 要缓存的 分隔出来的 chunk 名称
          minChunks: 2,
          minSize: 0,
          priority: 2,
        },
      },
    },
    
    runtimeChunk: {
      name: 'runtime',
    },
  },
  
  entry: {
    app: './src/index',
    commons: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'prop-types',
      'classnames',
      'jquery',
      'lodash',
      'numeral',
      'immutability-helper',
      'query-string',
      'es6-promise',
      'url-search-params-polyfill',
      
      'utils/core/decorator.js',
      'utils/core/local_storage.js',
      'utils/core/request.js',
      'utils/core/emitter.js',
    ],
  },
  
  /**
   * 排除打包的内容---走cdn
   */
  /*externals: {
    $: 'jQuery',
    jQuery: 'jQuery',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    leaflet: 'L',
  },*/
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    modules: ['node_modules', 'src/'],
    mainFields: ['browser', 'main', 'module'],
  },
  
  node: {
    fs: 'empty',
  },
  
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: formatStyleLoader(),
      },
      
      //scss
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
      
      // less
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
      
      // 静态资源
      ...staticResource,
      
      // 懒加载
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
      
      // jsx?配置
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=js',
        exclude: [excludeRegex, routesComponentsRegex],
      },
      
      // tsx?配置
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'babel-loader'],
        exclude: [excludeRegex, routesComponentsRegex],
      },
    ],
  },
  
  plugins: [
    new happyPack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader'],
    }),
    
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
}
