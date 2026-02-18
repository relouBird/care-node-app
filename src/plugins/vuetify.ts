// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import {
  DARK_CARE_NODE_THEME,
  LIGHT_CARE_NODE_THEME,
} from "@/constants/theme.constant";

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
        variables: DARK_CARE_NODE_THEME.variables,
      },
    },
  },
  defaults: {
    VBtn: {
      rounded: "xl",
      className: "text-transform-none",
      variant: "flat",
    },
    VBtnSecondary: {
      variant: "outlined",
      rounded: "xl",
      color: "primary",
    },
    VBtnTertiary: {
      rounded: "xl",
      variant: "plain",
    },
    VCard: {
      rounded: "xl",
      elevation: 0,
    },
    VTextField: {
      rounded: "xl",
      variant: "underlined",
      color: "primary",
    },
    VOtpField: {
      rounded: "xl",
      variant: "underlined",
      color: "primary",
    },
    VTextarea: {
      rounded: "xl",
      variant: "underlined",
      color: "primary",
    },
    VAutocomplete: {
      rounded: "xl",
      variant: "underlined",
    },
    VSelect: {
      rounded: "xl",
      variant: "underlined",
      color: "primary",
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: "top",
    },
    VToolbar: {
      // VBtn: { variant: 'flat' },
    },
    VListItem: {
      minHeight: "45px",
    },
  },
});
