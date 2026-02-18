// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { DARK_CARE_NODE_THEME, LIGHT_CARE_NODE_THEME } from '@/constants/theme.constant'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    // defaultTheme: "system",
    themes: {
      light: {
        colors: LIGHT_CARE_NODE_THEME.colors,
        variables: LIGHT_CARE_NODE_THEME.variables,
      },
      dark: {
        colors: DARK_CARE_NODE_THEME.colors,
        variables: DARK_CARE_NODE_THEME.variables
      },
    },
  },
});
