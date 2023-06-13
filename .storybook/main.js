/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-actions",
		{
			name: '@storybook/addon-styling',
			options: {
				// Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
				// For more details on this addon's options.
			},
		},
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
};
export default config;
