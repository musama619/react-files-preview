/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/react-files-preview/**/*.{html,ts,js}",
		"./node_modules/react-files-preview/**/**/*.{html,ts,js}",
		"./node_modules/react-files-preview/**/**/*.{html,ts,js}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
