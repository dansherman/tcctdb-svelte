const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
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
