// plugins/axios.ts
import axios from "axios";
import type { App } from "vue";

const instance = axios.create({
  baseURL: publicRuntimeConfig.API_BASE_URL || "http://localhost:3000",
  method: "get",
});

export default {
  install: (app: App) => {
    // Provide the axios instance globally
    app.provide('axios', instance);
    // Optionally, add to global properties for Options API compatibility
    app.config.globalProperties.$axios = instance;
  }
};
