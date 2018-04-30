import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'

export default ({ prod } = {}) => ({
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.[chunkhash].js',
  },
  resolve: {
    alias: {
      '@components': path.join(path.resolve(__dirname, "src"), 'components'),
      '@flow': path.join(path.resolve(__dirname, "src"), 'flow'),
      '@core': path.join(path.resolve(__dirname, "src"), 'core'),
      '@utils': path.join(path.resolve(__dirname, "src"), 'utils'),
      '@assets': path.join(path.resolve(__dirname, "src"), 'assets'),
      '@storage': path.join(path.resolve(__dirname, "src"), 'storage')
    },
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  devtool: prod ? undefined : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  devServer: {
    inline: true,
    port: 3333,
    host: "0.0.0.0",
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new DotenvPlugin({
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    })
  ],
})