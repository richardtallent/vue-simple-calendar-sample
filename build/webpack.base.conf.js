var path = require("path")
var config = require("../config")
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
	return path.join(__dirname, "..", dir)
}

module.exports = {
	entry: ["babel-polyfill", "./src/main.js"],
	output: {
		path: config.build.assetsRoot,
		filename: "[name].js",
		publicPath:
			process.env.NODE_ENV === "production"
				? config.build.assetsPublicPath
				: config.dev.assetsPublicPath,
	},
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			"@": resolve("src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader", "postcss-loader"],
			},
		],

	},
	plugins: [
		new VueLoaderPlugin(),
	],
}
