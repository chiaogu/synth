import path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@components': path.join(path.resolve(__dirname, "src"), 'components'),
    },
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  devServer: {
    inline: true,
    port: 3333,
  },
  plugins: [HTMLWebpackPluginConfig],
};