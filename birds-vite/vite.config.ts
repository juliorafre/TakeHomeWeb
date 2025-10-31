import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react(), tailwindcss()],
		server: {
			proxy: {
				"/api/graphql": env.GRAPHQL_ENDPOINT,
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							if (id.includes("@apollo/client") || id.includes("graphql")) {
								return "apollo";
							}
							if (id.includes("react-router")) {
								return "react-router";
							}
							if (id.includes("motion")) {
								return "motion";
							}
							if (id.includes("react-hook-form")) {
								return "forms";
							}
							if (id.includes("@radix-ui") || id.includes("lucide-react")) {
								return "ui-libs";
							}
							return "vendor";
						}
					},
				},
			},
		},
	};
});
