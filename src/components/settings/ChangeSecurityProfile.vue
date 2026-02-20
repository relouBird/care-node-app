<script setup lang="ts">
import { IconLock } from "@tabler/icons-vue";

// Sécurité
const security = ref({
  currentPassword: "",
  newPassword: "",
  repeatNewPassword: "",
});
</script>

<template>
  <!-- 🔒 SECURITY -->
  <v-card rounded="xl" elevation="0" class="settings-card shadow-boxed mb-4">
    <v-card-title class="section-header">
      <div class="d-flex align-center gap-2">
        <IconLock size="28" class="text-secondary" />
        <span>Sécurité</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-6 pt-4 pb-0">
      <v-text-field
        v-model="security.currentPassword"
        label="Mot de passe actuel"
        type="password"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        class="mb-2"
      />
      <v-text-field
        v-model="security.currentPassword"
        label="Nouveau mot de passe"
        type="password"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        class="mb-2"
      />
      <v-text-field
        v-model="security.newPassword"
        label="Repeter nouveau mot de passe"
        type="password"
        variant="outlined"
        prepend-inner-icon="mdi-lock-reset"
      />
    </v-card-text>

    <div class="px-6 pb-4 d-flex align-center justify-end">
      <v-btn variant="flat" color="primary">Modifier</v-btn>
    </div>
  </v-card>
</template>

<style scoped>
</style>
