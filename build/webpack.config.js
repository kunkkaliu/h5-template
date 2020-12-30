/**
 * Created by liudonghui on 2018/3/6.
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require('@insanecoding/inline-manifest-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function src(dir) {
  return resolve(path.join('src', dir))
}

function getEntry(globPath, pathDir) {
  const files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
    entries[basename] = entry;
  }
  return entries;
}
//我们的key不是简单用的上一个代码的index,login而是用的index/index,login/login因为考虑在login目录下面还有register
//文件路径的\\和/跟操作系统也有关系，需要注意
const htmls = getEntry('./src/pages/*/*.html', 'src/pages/');
const HtmlPlugin = [];
const entries = {};

for (let key in htmls) {
  // entries[key] = './src/pages/' + key + '/entry.jsx';
  const ekey = key.split('.')[0];
  entries[key] = './src/pages/' + ekey + '/' + ekey + '.js';
  HtmlPlugin.push(new HtmlWebpackPlugin({
    filename: 'views/' + key + '.html',
    template: htmls[key],
    inject: true,
    favicon: src('favicon.ico'),
    chunks: ['runtime', 'vendor', key],
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true
    }
  }))
}

module.exports = {
  entry: entries,
  devtool: 'inline-source-map',
  target: 'web',
  output: {
    path: resolve('/dist'),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    publicPath: '/'
  },
  plugins: [].concat(HtmlPlugin, new InlineManifestWebpackPlugin('runtime')),
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      'common': src('common'),
      'components': src('components'),
      'utils': src('utils'),
      'pages': src('pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, src('common/libs')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10240,
          name: 'static/images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.less?$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            // minimize: true,
            importLoaders: 2,
            modules: false,
            // localIdentName: '[local]___[hash:base64:5]'
          }
        }, 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            // minimize: true,
            importLoaders: 2,
            modules: false,
            // localIdentName: '[local]___[hash:base64:5]'
          }
        }, 'postcss-loader']
      }
    ]
  }
};
