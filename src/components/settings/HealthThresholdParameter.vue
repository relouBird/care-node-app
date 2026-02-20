<script setup lang="ts">
import { IconHeartRateMonitor } from '@tabler/icons-vue';
// Seuils d'alerte
const thresholds = ref({
  heartRate: { min: 60, max: 100 },
  oxygen: { min: 90 },
  temperature: { min: 36.0, max: 37.5 },
  ambientTemp: { min: 18, max: 26 },
});
</script>

<template>
  <v-card rounded="xl" elevation="0" class="settings-card shadow-boxed">
    <v-card-title class="section-header">
      <div class="d-flex align-center gap-2">
        <icon-heart-rate-monitor class="text-error" size="24" />
        <span>Seuils d'alerte</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-6">
      <!-- Seuils d'alerte -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="6"
          :class="['px-0', $vuetify.display.smAndDown ? '' : 'pr-2']"
        >
          <div class="threshold-card">
            <div class="threshold-header">
              <v-icon icon="mdi-heart" color="error" />
              <span>Fréquence cardiaque</span>
            </div>
            <div class="threshold-inputs">
              <v-text-field
                v-model="thresholds.heartRate.min"
                label="Min"
                type="number"
                variant="outlined"
                suffix="bpm"
                density="compact"
                readonly
              />
              <v-text-field
                v-model="thresholds.heartRate.max"
                label="Max"
                type="number"
                variant="outlined"
                suffix="bpm"
                density="compact"
                readonly
              />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" lg="6" class="px-0">
          <div class="threshold-card">
            <div class="threshold-header">
              <v-icon icon="mdi-lungs" color="info" />
              <span>Oxygène</span>
            </div>
            <div class="threshold-inputs">
              <v-text-field
                v-model="thresholds.oxygen.min"
                label="Min"
                type="number"
                variant="outlined"
                suffix="%"
                density="compact"
                readonly
              />
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
          lg="6"
          :class="['px-0', $vuetify.display.smAndDown ? '' : 'pr-2']"
        >
          <div class="threshold-card">
            <div class="threshold-header">
              <v-icon icon="mdi-thermometer" color="warning" />
              <span>Température</span>
            </div>
            <div class="threshold-inputs">
              <v-text-field
                v-model="thresholds.temperature.min"
                label="Min"
                type="number"
                variant="outlined"
                suffix="°C"
                density="compact"
                readonly
              />
              <v-text-field
                v-model="thresholds.temperature.max"
                label="Max"
                type="number"
                variant="outlined"
                suffix="°C"
                density="compact"
                readonly
              />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" lg="6" class="px-0">
          <div class="threshold-card">
            <div class="threshold-header">
              <v-icon icon="mdi-home-thermometer" color="warning" />
              <span>Température ambiante</span>
            </div>
            <div class="threshold-inputs">
              <v-text-field
                v-model="thresholds.ambientTemp.min"
                label="Min"
                type="number"
                variant="outlined"
                suffix="°C"
                density="compact"
                readonly
              />
              <v-text-field
                v-model="thresholds.ambientTemp.max"
                label="Max"
                type="number"
                variant="outlined"
                suffix="°C"
                density="compact"
                readonly
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Threshold cards */
.threshold-card {
  background: #f9fafb;
  padding: 16px;
  padding-bottom: 4px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.threshold-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 500;
  color: #2c3e50;
}

.threshold-inputs {
  display: flex;
  gap: 8px;
}

.threshold-separator {
  color: #7f8c8d;
  font-weight: 500;
}
</style>
