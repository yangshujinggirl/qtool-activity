const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Ip = require('ip');
const pkg = require('./package.json');

const env = {
  path: './',// 输出主路径
  publicPath: '/',// 资源cdn路径
  cssFileName: '',// 输出外部css文件路径
  jsFileName: '',// 输出外部js文件路径
  imgFileName: '',// 输出外部img文件路径
  fontFileName: '',
  htmlFilePath: '',// 输出外部html文件路径
  lib_env: 'development'//第三发依赖的环境名称
}
switch (process.env.NODE_ENV) {
    case 'development':
      env.path = './dist';
      env.publicPath = '/';
      env.cssFileName = '[name].css';
      env.jsFileName = '[name].js';
      env.imgFileName = 'imgs/[name]-[hash:5].[ext]';
      env.htmlFilePath = '';
      env.lib_env = 'development';
      break;
    case 'production':
      env.path = `./dist/qtoolsActivity/${pkg.actName}/`;
      env.publicPath = './';
      env.cssFileName = '[name].css';
      env.jsFileName = '[name].js';
      env.imgFileName = 'imgs/[name]-[hash:5].[ext]';
      env.htmlFilePath = '';
      env.lib_env = 'production';
      break;
    default:
      throw new Error('环境参数不正确');
}

let pagePath = './src';
const Entry = require('./entryConfig.js')(pagePath);

const htmlArray =[];
for(let key in Entry.entry) {
  if(Entry.entry.hasOwnProperty(key)) {
    htmlArray.push(new HtmlWebpackPlugin({
      env:env.NODE_ENV,
      template:`${pagePath}/${key}/index.html`,
      // template:`./src/index.html`,
      filename:`${env.htmlFilePath}${key}.html`,
      chunks:['common',key],
      hash:true
    }))
  }
}
console.log(env);
console.log(Entry);
//生产环境，压缩
if(process.env.NODE_ENV === 'production'){
  htmlArray.push(new UglifyJSPlugin({}))
}
const SCSSExtractTextPlugin = new ExtractTextPlugin({
  filename:env.cssFileName
})
// const options = {
//   presets: ["@babel/preset-env","@babel/preset-stage-2"]
// }
module.exports = {
  resolve: {
    alias: {
        'vue': 'vue/dist/vue.js'
    }
  },
  mode:process.env.NODE_ENV,
  entry: Entry.entry,
  output: {
    path: path.resolve(__dirname, env.path),
    filename: env.jsFileName,
    publicPath: env.publicPath,
    chunkFilename: env.jsFileName
  },
  // devtool: "source-map", // enum
  module:{
    rules:[{
      test:/\.js$/,
      exclude:/(node_modules|bower_components)/,
      use:{
        loader:'babel-loader',
        options:{
          presets: ['env', 'stage-2']
        }
      }
    },{
      test:/\.s|css$/,
      use:SCSSExtractTextPlugin.extract({
        use:[
          {
            loader:'css-loader',
            options:{
              // minimize:process.env.NODE_env !== 'development'
            }
          },{
            loader:'postcss-loader',
            options:{}
          },{
            loader:'sass-loader',
            options:{}
          }
        ]
      })
    },{
      test:/\.html$/,
      use:[{
        loader:'html-loader',
        options:{
          exportAsEs6Default:true,
          attrs: [':data-src', ':src']
        }
      }]
    },{
      test:/\.(jpe?g|png|gif)$/i,
      use:[{
        loader:'url-loader',
        options:{
          limit:8192,
          name: env.imgFileName,
          publicPath: env.publicPath
        }
      }]
    }]
  },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    SCSSExtractTextPlugin,
    new webpack.ProvidePlugin({
      '$':'jquery'
    }),
  ].concat(htmlArray),
  optimization: {
    splitChunks: {
      cacheGroups: {
        // default: false,
        // vendors: false,
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: 'initial',
        //   enforce: true,
        //   priority: 10,
        //   name: 'vendor'
        // },
        common: {
          chunks: "all",
          minChunks: 2,
          name: 'common',
          enforce: true,
          priority: 5
        }
      }
    }
  },
  devServer:{
    host: Ip.address(),
    port:3006,
    proxy: {
      '/invitation': {
        target: 'http://192.168.2.35:8214/',
        // target: 'http://v5.apph5.testin.qtoolsbaby.net:81/',
        changeOrigin: true,
      },
    }
  }
};
