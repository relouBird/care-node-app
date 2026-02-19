<template>
  <v-app-bar elevation="0" class="top-bar" height="70">
    <v-app-bar-title class="page-title">
      <div class="d-flex align-center justify-start ga-2">
        <v-btn @click="toggleSidebar" icon>
          <IconMenu2 />
        </v-btn>
      </div>
    </v-app-bar-title>

    <v-spacer />

    <!-- Barre de recherche -->
    <v-text-field
      v-model="search"
      placeholder="Rechercher..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      hide-details
      class="search-field mx-4"
      style="max-width: 300px"
    />

    <!-- Notifications -->
    <!-- Bouton notifications avec badge -->
    <v-btn icon variant="text" size="small">
      <v-badge color="error" content="3" overlap offset-x="3" offset-y="16">
        <icon-bell-ringing2 color="#7f8c8d" size="26" />
      </v-badge>
    </v-btn>

    <!-- Avatar utilisateur -->
    <v-btn class="ml-4 pa-0 bg-primary" size="40" icon>
      <icon-user-filled color="white" size="25" />
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { IconMenu2, IconBellRinging2, IconUserFilled } from "@tabler/icons-vue";

const route = useRoute();
const search = ref("");

// Méthode pour basculer la sidebar (à implémenter selon votre logique)
const toggleSidebar = () => {
  // Émettre un événement ou utiliser un store pour contrôler la visibilité de la sidebar
  console.log("Toggle sidebar");
};
</script>

<style scoped>
.top-bar {
  background: white !important;
  border-bottom: 1px solid #e5eaef !important;
}

.page-title {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  padding-top: 0.25rem;
}

:deep(.search-field .v-field) {
  background: #f0fdf9;
}

:deep(.search-field .v-field__outline) {
  color: #d0e8df;
}

.notification-btn {
  color: #7f8c8d;
}
</style>
