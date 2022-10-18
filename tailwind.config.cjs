const defaultTheme = require('tailwindcss/defaultTheme')
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
				limelight: ["Limelight", "cursive"],
				poppins: ["Poppins", "sans"]
			},
			height: {
				'128': '32rem',
				'192': '48rem'
			}
		}
	},

	plugins: [require('@tailwindcss/forms'),]
};

module.exports = config;
