// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      VueRouter({
        dts: "src/typed-router.d.ts",
      }),
      Layouts({
        inheritDefaultLayout: false,
      }),
      AutoImport({
        imports: [
          "vue",
          VueRouterAutoImports,
          {
            pinia: ["defineStore", "storeToRefs"],
          },
        ],
        dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        dts: "src/components.d.ts",
      }),
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/assets/scss/style.scss",
        },
      }),
      Fonts({
        fontsource: {
          families: [
            {
              name: "Roboto",
              weights: [100, 300, 400, 500, 700, 900],
              styles: ["normal", "italic"],
            },
            {
              name: "Montserrat", // ← Ajout de Montserrat
              weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], // tous les poids disponibles [citation:2][citation:6]
              styles: ["normal", "italic"],
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      exclude: [
        "vuetify",
        "vue-router",
        "unplugin-vue-router/runtime",
        "unplugin-vue-router/data-loaders",
        "unplugin-vue-router/data-loaders/basic",
        "pinia-plugin-persistedstate",
      ],
    },
    define: {
      publicRuntimeConfig: {
        APP_NAME: JSON.stringify(env.APP_NAME),
        API_HOST: JSON.stringify(env.API_HOST),
        API_BASE_URI: JSON.stringify(env.API_BASE_URI),
        API_BASE_URL: JSON.stringify(env.API_BASE_URL),
        AUTH_TOKEN_EXPIRED_AT: JSON.stringify(env.AUTH_TOKEN_EXPIRED_AT),
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      host: true,
      port: env.PORT ? Number(env.PORT) : 5173,
      allowedHosts: ["d50f-102-244-222-174.ngrok-free.app"],
    },
  };
});
