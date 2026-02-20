<script setup lang="ts">
import { IconUser } from "@tabler/icons-vue";

// Informations utilisateur
const userInfo = ref({
  username: "Jean",
  phone: "+237 6XX XXX XXX",
});
</script>

<template>
  <!-- 👤 PROFIL -->
  <v-card rounded="xl" elevation="0" class="settings-card shadow-boxed mb-4">
    <v-card-title class="section-header">
      <div class="d-flex align-center gap-2">
        <IconUser size="24" class="text-primary" />
        <span>Profil</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-6 pt-4">
      <v-text-field
        v-model="userInfo.username"
        label="Nom d'utilisateur"
        variant="outlined"
        prepend-inner-icon="mdi-account"
        class="mb-2"
      />
      <v-text-field
        v-model="userInfo.phone"
        label="Téléphone"
        variant="outlined"
        prepend-inner-icon="mdi-phone"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
