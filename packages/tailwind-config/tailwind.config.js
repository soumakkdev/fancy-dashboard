const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		// app content
		`src/**/*.{js,ts,jsx,tsx}`,
		// include packages if not transpiling
		// "../../packages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brandblue: colors.blue[500],
				brandred: colors.red[500],
				brand: 'var(--brand-color)',
				surface: '#F6F8FA',
			},
			fontFamily: {
				serif: 'var(--lora-font)',
				body: 'var(--inter-font)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
