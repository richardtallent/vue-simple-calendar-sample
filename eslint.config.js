import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import prettier from "eslint-plugin-prettier/recommended"
import tsParser from "@typescript-eslint/parser"
import globals from "globals"

export default [
	{ ignores: ["dist", "node_modules"] },
	js.configs.recommended,
	...pluginVue.configs["flat/essential"],
	prettier,
	{
		files: ["**/*.{js,ts,vue}"],
		languageOptions: {
			globals: globals.browser,
			parserOptions: { parser: tsParser },
		},
	},
	{ files: ["**/*.ts"], languageOptions: { parser: tsParser } },
]
