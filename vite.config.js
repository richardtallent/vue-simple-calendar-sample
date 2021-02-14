import vue from "@vitejs/plugin-vue"
import typescript from "rollup-plugin-typescript2"
const path = require("path")

module.exports = {
	plugins: [vue(), typescript()],
	esbuild: false,
	base: "./",
	build: {
		rollupOptions: {
			output: {
				// Provide global variables to use in the UMD build for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
}
