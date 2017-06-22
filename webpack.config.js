const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const PORT = 3002;
const APP_TITLE = 'Standoff';

const config = {
  entry: {
    main: ['babel-polyfill', './src/index']
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({loaders: ['babel-loader']}),
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      template: './src/index.ejs'
    }),
    new FaviconsWebpackPlugin({
      title: APP_TITLE,
      logo: './src/assets/favicon.png',
      background: 'black',
      icons: {
        favicons: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({resource}) => /node_modules/.test(resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest'})
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config;
} else {
  // we're in development mode
  module.exports = merge(
    {
      entry: {
        main: [
          'react-hot-loader/patch', // load react-hot-loader before everything else
          `webpack-dev-server/client?http://localhost:${PORT}`,
          'webpack/hot/only-dev-server'
        ]
      }
    },
    config,
    {
      output: {
        filename: '[name].js'
      },
      devtool: 'inline-source-map',
      devServer: {
        hot: true,
        port: PORT,
        historyApiFallback: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    }
  );
}
