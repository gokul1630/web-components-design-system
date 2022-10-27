const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const { terser } = require('rollup-plugin-terser')
const pkg = require('./package.json')

module.exports = [
	{
		input: 'src/index.ts',
		cache: false,
		treeshake: { propertyReadSideEffects: false },
		plugins: [
			terser(),
			commonjs(),
			resolve(),
			typescript({ tsconfig: './tsconfig.json', outputToFilesystem: false })
		],
		output: [
			{ file: pkg.module, format: 'es', sourcemap: true },
			{ file: pkg.main, format: 'cjs', sourcemap: true },
		]
	}
];
