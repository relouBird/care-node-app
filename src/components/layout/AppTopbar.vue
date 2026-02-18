<template>
  <v-app-bar
    elevation="0"
    class="top-bar"
    height="70"
  >
    <v-app-bar-title class="page-title">
      {{ pageTitle }}
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
    <v-btn
      icon
      variant="text"
      class="notification-btn"
    >
      <v-badge
        color="error"
        content="3"
        overlap
      >
        <v-icon icon="mdi-bell" />
      </v-badge>
    </v-btn>

    <!-- Avatar utilisateur -->
    <v-avatar
      size="40"
      color="primary"
      class="ml-4"
    >
      <v-icon icon="mdi-account" />
    </v-avatar>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const search = ref('')

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': 'Tableau de bord',
    '/patients': 'Gestion des patients',
    '/appointments': 'Rendez-vous',
    '/medications': 'Médicaments',
    '/stats': 'Statistiques',
    '/settings': 'Paramètres',
    '/profile': 'Mon profil'
  }

  return titles[route.path] || 'Care Node'
})
</script>

<style scoped>
.top-bar {
  background: white !important;
  border-bottom: 1px solid #e5eaef !important;
}

.page-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}

.search-field {
  border-radius: 12px;
}

:deep(.search-field .v-field) {
  border-radius: 12px;
  background: #f0fdf9;
}

.notification-btn {
  color: #7f8c8d;
}
</style>
