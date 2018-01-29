var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var path = require('path')
const webpack = require('webpack')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin")
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
var WebpackCleanPlugin = require('webpack-clean')
let pathsToClean = [
  'dist',
  'dist'
]

// the clean options to use
let cleanOptions = {
  root:     './dist',
  // exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}
module.exports = {
  entry: {
    bundle1: './main1.js',
    three: ['jquery']
    // bundle2: './main2.js',
    // common1: ['jquery'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [{
                  loader: "css-loader",
              }]
          })
        }
    ]
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js?$/,
  //       exclude: /node_modules/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015', 'react']
  //       }
  //     }
  //   ]
  // },
  plugins: [
    new OpenBrowserPlugin({ 
      url: 'http://localhost:8080' 
    }),
    new HtmlwebpackPlugin({
      title: 'MyApp',
      filename: 'index.html'
    }),
    new webpack.DllPlugin({
      path: __dirname +'/dist/manifest.json',
      name: '[name]',
      context: __dirname,
    }),
    new CommonsChunkPlugin({
      name: 'three',
      filename: 'jsthree/three.js',
      minChunks: function(module) {
        // let flag =  module.context && module.context.indexOf('node_modules') !== -1;
        console.log("大大",module.context);
        // return flag;
      }

    }),
    // new CommonsChunkPlugin({
    //   name: ['chunk', 'common1'],
    //   // filename: 'chunk.js',
    //   minChunks: 2
    // }),
    // new UglifyJsPlugin({
    //    comments: false,
    //    compress: {
    //      warnings: true,
    //      drop_console: false,
    //    }
    // }),
    // new ParallelUglifyPlugin({
    //   cacheDir: '.cache/',
    //   uglifyJS:{
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),
    new ExtractTextPlugin('css/[name].css'),
    new CleanWebpackPlugin([
      'dist',
    ],{
      root:     __dirname,
      // exclude:  ['common1.js'],
      verbose:  true,
      dry:      false
    })
  ]
}
