const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  entry: resolveAppPath('src'),
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'static/js/bundle.js',
    // path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    // Enable compression
    compress: true,
    // Enable hot reloading
    hot: true,
    host,
    port: 3000,
    // Public path is root of content base
    static: {
      directory: resolveAppPath('public'),
      publicPath: '/',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html')
    })
  ]
};