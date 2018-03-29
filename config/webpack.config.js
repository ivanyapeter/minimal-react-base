const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
    extensions: ['*', '.js', '.jsx'],
  },
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
    ],
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
        },
        app: {
          name: 'app',
        },
      },
    },
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
