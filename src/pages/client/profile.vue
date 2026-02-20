<route lang="yaml">
meta:
  layout: client
</route>

<template>
  <div class="settings-page">
    <!-- Header -->
    <div class="page-header mb-6">
      <div>
        <h1 class="page-title">Paramètres</h1>
        <p class="page-subtitle">Gérez vos préférences et informations</p>
      </div>
      <v-btn
        color="primary"
        size="large"
        @click="saveSettings"
        :loading="saving"
        v-if="!$vuetify.display.smAndDown"
      >
        Enregistrer
      </v-btn>
      <v-btn variant="flat" color="primary" rounded="lg" icon v-else>
        <icon-device-floppy />
      </v-btn>
    </div>

    <!-- Sections -->
    <v-row>
      <v-col cols="12">
        <!-- Avatar Selection -->
        <div class="mb-4">
          <select-profile />
        </div>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <!-- 👤 PROFIL -->
        <change-details-profile />

        <!-- 🔒 SECURITY -->
        <change-security-profile />
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <!-- ❤️ PARAMÈTRES MÉDICAUX -->
        <health-parameter />

        <!-- 🧬 SEUILS MÉDICAUX -->
        <health-threshold-parameter />
      </v-col>

      <v-col cols="12">
        <!-- 🚨 ALERTES ET SURVEILLANCE -->
        <alert-monitoring />
      </v-col>
    </v-row>

    <!-- Boutons d'action en bas -->
    <v-row class="mt-4">
      <v-col cols="12">
        <div class="action-buttons">
          <v-btn
            color="error"
            variant="outlined"
            size="large"
            @click="resetSettings"
          >
            Réinitialiser
          </v-btn>
          <v-btn
            color="primary"
            size="large"
            @click="saveSettings"
            :loading="saving"
          >
            Enregistrer les modifications
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { IconDeviceFloppy } from "@tabler/icons-vue";

const saving = ref(false);



// Actions
const saveSettings = async () => {
  saving.value = true;

  // Simuler sauvegarde
  await new Promise((resolve) => setTimeout(resolve, 1500));

  saving.value = false;

  // TODO: Afficher notification de succès
};

const resetSettings = () => {
  if (confirm("Voulez-vous vraiment réinitialiser tous les paramètres ?")) {
    // Réinitialiser aux valeurs par défaut
  }
};
</script>

<style scoped>
.settings-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 14px;
  color: #7f8c8d;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px 0;
}
</style>
