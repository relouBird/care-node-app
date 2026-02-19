import {
  IconLayoutCollage,
  IconHeartbeat,
  IconMapPin2,
  IconUser,
  IconUsers,
  IconChartDots,
  IconSettings,
} from "@tabler/icons-vue";

export const mobileNavigationItems = [
  {
    label: "Accueil",
    icon: IconLayoutCollage,
    value: "dashboard",
    to: "/client/dashboard",
  },
  {
    label: "Patients",
    icon: IconHeartbeat,
    value: "patients",
    to: "/client/patients",
  },
  {
    label: "Localisation",
    icon: IconMapPin2,
    value: "Map",
    to: "/client/map",
  },
  {
    label: "Profil",
    icon: IconUser,
    value: "profile",
    to: "/client/profile",
  },
];

export const desktopNavigationItems = [
  {
    label: "Tableau de bord",
    icon: IconLayoutCollage,
    value: "dashboard",
    to: "/client/dashboard",
  },
  {
    label: "Patients",
    icon: IconUsers,
    value: "patients",
    to: "/client/patients",
  },
  {
    label: "Localisation",
    icon: IconMapPin2,
    value: "map",
    to: "/client/map",
  },
  {
    label: "Statistiques",
    icon: IconChartDots,
    value: "stats",
    to: "/client/stats",
  },
  {
    label: "Paramètres",
    icon: IconSettings,
    value: "settings",
    to: "/client/profile",
  },
];
