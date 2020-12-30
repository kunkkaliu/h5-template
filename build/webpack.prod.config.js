/**
 * Created by liudonghui on 2018/3/7.
 */
const webpack = require('webpack');
const base = require('./webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

base.mode = 'production';
base.output.filename = 'static/js/[name].[chunkhash].js';
base.output.chunkFilename = 'static/js/[name].[chunkhash].js';
base.output.publicPath = '/sizon/';
base.devtool = 'source-map';
Object.keys(base.entry).forEach(function (name) {
  base.entry[name] = [].concat(base.entry[name]);
});
base.optimization = {
  runtimeChunk: {
    name: "runtime"
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all"
      }
    }
  }
};

base.plugins.push(
  new MiniCssExtractPlugin({
    filename: "static/css/[name].[contenthash].css"
  }),
  new webpack.HashedModuleIdsPlugin()
);

if (!!process.env.ANALYZE) {
  base.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = base;