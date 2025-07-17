import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
    const isDev = mode === "development";

    return {
        plugins: [
            react({
                jsxRuntime: "automatic",
            }),
            svgr(),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
            extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
        css: {
            modules: {
                // Поддержка *.module.scss
                generateScopedName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64:8]",
            },
            preprocessorOptions: {
                scss: {
                    // Автоимпорт переменных
                    additionalData: `@use "@/styles/variables" as *;`,
                },
            },
        },
        server: {
            port: 3000,
            open: true,
            strictPort: true,
        },
        build: {
            outDir: "dist",
            sourcemap: isDev,
        },
        base: "/",
    };
});
