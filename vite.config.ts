import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		})
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "ReactFilesPreview",
			fileName: (format) => `react-files-preview.${format}.js`,
			formats: ["es"]
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
