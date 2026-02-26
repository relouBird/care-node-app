/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "./pinia";
import router from "../router";
import head from "./head";
import axios from "./axios";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(head).use(axios).use(pinia).use(router);
}
