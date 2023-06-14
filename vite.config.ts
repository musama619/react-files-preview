import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.tsx"),
			name: "ReactFilePreview",
			fileName: (format) => `react-file-preview.${format}.js`,
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
