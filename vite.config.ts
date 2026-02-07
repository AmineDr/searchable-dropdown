import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
	plugins: [
        react(),
        tailwindcss(),
        dts(
            {
                insertTypesEntry: true,
                rollupTypes: true,
                tsconfigPath: "./tsconfig.app.json"
            }
        ),
        libInjectCss()
    ],
	root: ".",
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "SearchableSelect",
            fileName: format => `searchable-select.${format}.js`,
            formats: ["es", "cjs", "umd"]
        },
        rollupOptions: {
            external: Object.keys(peerDependencies),
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM"
                }
            }
        }
    }
});
