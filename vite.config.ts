import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "ReactFilesPreview",
			formats: ["es", "umd"],
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
