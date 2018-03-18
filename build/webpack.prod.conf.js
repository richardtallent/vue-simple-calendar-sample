var utils = require("./utils")
var webpack = require("webpack")
var config = require("../config")
var merge = require("webpack-merge")
var baseWebpackConfig = require("./webpack.base.conf")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	module: {
		rules: utils.styleLoaders({}),
	},
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath("js/[name].[chunkhash].js"),
		chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			"process.env": env,
		}),
		// extract css into its own file
		new ExtractTextPlugin({
			filename: utils.assetsPath("css/[name].[contenthash].css"),
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: "index.html",
			inject: true,
			minify: false,
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: "dependency",
		}),
	],
})

module.exports = webpackConfig
