import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import ViteComponents from "vite-plugin-components";
import WindiCSS from "vite-plugin-windicss";
import legacy from "@vitejs/plugin-legacy";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
    dedupe: ["vue-demi"],
  },

  build: {
    minify: true,
  },

  plugins: [
    createVuePlugin(),
    ViteComponents({
      customComponentResolvers: [
        (name) => {
          if (name.startsWith("El")) {
            const partialName =
              name[2].toLowerCase() +
              name.substring(3).replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
            return {
              path: `element-ui/lib/${partialName}`,
            };
          }
        },
      ],
    }),
    WindiCSS(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],

  server: {
    port: 8080,
  },
});

export default config;
