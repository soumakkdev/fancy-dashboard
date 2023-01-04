import { defineConfig } from 'tsup'

export default defineConfig((options) => {
	return {
		entry: ['src/index.ts'],
		clean: true,
		dts: true,
		format: ['esm', 'cjs'],
		external: 'react',
		minify: !options.watch,
	}
})
