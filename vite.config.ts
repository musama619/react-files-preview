import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import { PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		})
	],
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "ReactFilesPreview",
			fileName: (format) => `react-files-preview.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
});
