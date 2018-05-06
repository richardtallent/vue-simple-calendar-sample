// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path")

module.exports = {
	build: {
		env: require("./prod.env"),
		index: path.resolve(__dirname, "../dist/index.html"),
		assetsRoot: path.resolve(__dirname, "../dist"),
		assetsSubDirectory: "static",
		assetsPublicPath: ".",
		productionSourceMap: true,
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report,
	},
	dev: {
		env: require("./dev.env"),
		port: 8081,
		autoOpenBrowser: true,
		assetsSubDirectory: "static",
		assetsPublicPath: "/",
		proxyTable: {},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false,
	},
}
