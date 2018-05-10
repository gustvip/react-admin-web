/**
 * Created by joey on 2018/4/24
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const host = '0.0.0.0'
const port = 8080        // 端口号
const mockHost = 'http://10.0.1.150:8360'	// mock服务主机+端口

const config = merge(require('./build/webpack.config.dev'), {
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,            // 禁止自动弹出浏览器窗口
      analyzerHost: '127.0.0.1',      // 主机ip
      analyzerPort: port + 100,             // 端口
    }),
  ],
  entry: {
    app: [`webpack-dev-server/client?http://${host}:${port}/`],
  },
})
const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  hot: false,
  historyApiFallback: {
    index: '/dist/',
    disableDotRule: true,
  },
  stats: {
    colors: true,
  },
  proxy: {
    '/mockAPI/*': {
      target: mockHost,
      changeOrigin: true,
      secure: false,
    },
    '/apexAPI': {
      target: 'http://10.0.3.179:9090',
      pathRewrite: {'^/apexAPI': ''},
    },
  },
})

server.app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

server.listen(port, host)

