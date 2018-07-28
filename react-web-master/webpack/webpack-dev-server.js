const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");
const config = require('../config');
const root_dir = path.join(__dirname, '/../');
console.log(config);

let host = config.host;
let port = config.port;

let serverConfig = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  hot: true,
  inline: true,
  historyApiFallback: true,
  compress: true,
  staticOptions: {
  },
  stats: { colors: true },
  contentBase: path.join(__dirname, '/../public/'),
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'X-Custom-Header': 'yes'
  },
  proxy: {
    '/**': {
      target: '/index.html',
      secure: false,
      bypass: function (req, res, proxyOptions) {
        // if (req.path.indexOf('data')) {
        //   return res.json({ data: 'data from server !' });
        // }
        return '/';
      }
    }
  },
}

// 开启Hot Module Replacement相关设置
if (process.env.NODE_ENV === 'development') {
  webpackConfig.profile = true;
  webpackConfig.entry.index.push("webpack-dev-server/client?http://" + host + ":" + port + "/");
  webpackConfig.entry.index.push("webpack/hot/dev-server");
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

let compiler = webpack(webpackConfig);
let server = new WebpackDevServer(compiler, serverConfig);

server.listen(port, host, () => {
  console.log('listening on ' + host + ' : ' + port);
});