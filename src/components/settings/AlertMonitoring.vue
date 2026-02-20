<script setup lang="ts">
import {
  IconAlertTriangle,
  IconMapPinExclamation,
  IconShieldExclamation,
} from "@tabler/icons-vue";

// Seuils d'urgence
const urgencyThresholds = ref({
  distance: 10, // en km
  healthAutoDetect: true,
});

// Actions automatiques
const autoActions = ref({
  autoCall: true,
  sendLocation: true,
  smsAlert: true,
});
</script>

<template>
  <!-- 🚨 ALERTES ET SURVEILLANCE -->
  <v-card rounded="xl" elevation="0" class="settings-card mb-4">
    <v-card-title class="section-header pb-0">
      <div class="d-flex align-center gap-2">
        <icon-shield-exclamation class="text-error" size="24" />
        <span>Alertes et Surveillance</span>
      </div>
    </v-card-title>

    <v-card-text class="pa-6">
      <v-row class="mb-6">
        <!-- Urgence Distance -->
        <v-col cols="12" md="6">
          <div class="alert-threshold-card">
            <div class="threshold-header">
              <icon-map-pin-exclamation class="text-warning" size="24" />
              <div class="threshold-info">
                <div class="threshold-label">Urgence Distance</div>
                <div class="threshold-description">
                  Distance maximale acceptable
                </div>
              </div>
            </div>
            <div class="threshold-input-group">
              <v-text-field
                v-model="urgencyThresholds.distance"
                type="number"
                variant="outlined"
                suffix="km"
                density="comfortable"
                class="search-field"
                hide-details
              >
                <template v-slot:prepend-inner>
                  <icon-alert-triangle class="text-warning" size="20" />
                </template>
              </v-text-field>
              <div class="threshold-help">
                Au-delà de cette distance, une alerte sera déclenchée
              </div>
            </div>
          </div>
        </v-col>

        <!-- Urgence Santé -->
        <v-col cols="12" md="6">
          <div class="alert-threshold-card">
            <div class="threshold-header">
              <v-icon icon="mdi-heart-pulse" color="error" size="24" />
              <div class="threshold-info">
                <div class="threshold-label">Urgence Santé</div>
                <div class="threshold-description">Détection automatique</div>
              </div>
            </div>
            <div class="threshold-input-group">
              <v-switch
                v-model="urgencyThresholds.healthAutoDetect"
                label="Détecter automatiquement les anomalies"
                color="error"
                inset
                hide-details
                class="mb-3"
              />
              <div class="threshold-help">
                Basé sur fréquence cardiaque, oxygène et température
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Actions automatiques -->
      <div class="subsection-title mb-4">
        <v-icon icon="mdi-robot" color="primary" size="20" class="mr-2" />
        Actions automatiques
      </div>

      <div class="auto-actions-grid">
        <div class="action-card">
          <div class="action-icon">
            <v-icon icon="mdi-phone-in-talk" color="error" size="28" />
          </div>
          <div class="action-content">
            <v-switch
              v-model="autoActions.autoCall"
              label="Appel automatique"
              color="error"
              inset
              hide-details
            />
            <div class="action-description">
              Appeler le contact d'urgence si anomalie critique détectée
            </div>
          </div>
        </div>

        <div class="action-card">
          <div class="action-icon">
            <v-icon icon="mdi-map-marker-check" color="primary" size="28" />
          </div>
          <div class="action-content">
            <v-switch
              v-model="autoActions.sendLocation"
              label="Envoi localisation"
              color="primary"
              inset
              hide-details
            />
            <div class="action-description">
              Envoyer automatiquement la position GPS en cas d'urgence
            </div>
          </div>
        </div>

        <div class="action-card">
          <div class="action-icon">
            <v-icon icon="mdi-message-alert" color="info" size="28" />
          </div>
          <div class="action-content">
            <v-switch
              v-model="autoActions.smsAlert"
              label="Notification SMS"
              color="info"
              inset
              hide-details
            />
            <div class="action-description">
              Envoyer un SMS au contact d'urgence
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
}

/* Alert Threshold Cards */
.alert-threshold-card {
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  height: 100%;
  transition: all 0.3s ease;
}

.alert-threshold-card:hover {
  border-color: #13875d;
  box-shadow: 0 4px 12px rgba(19, 135, 93, 0.1);
}

.threshold-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.threshold-info {
  flex: 1;
}

.threshold-label {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.threshold-description {
  font-size: 12px;
  color: #7f8c8d;
}

.threshold-input-group {
  margin-top: 12px;
}

.threshold-help {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 8px;
  line-height: 1.4;
}

/* Auto Actions Grid */
.auto-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.action-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: #f0fdf9;
  border-color: #a8e6d1;
}

:deep(.search-field .v-field__outline) {
  color: #e5e7eb;
}

.action-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
  min-width: 0;
}

.action-description {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 4px;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 960px) {
  .auto-actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
