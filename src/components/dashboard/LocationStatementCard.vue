<template>
  <v-card rounded="xl" elevation="0" class="location-card shadow-boxed">
    <v-card-title class="card-title">
      <div class="d-flex align-center gap-2">
        <v-icon icon="mdi-map-marker" color="primary" />
        <span>Localisation</span>
      </div>
      <v-btn
        variant="text"
        size="small"
        color="primary"
        @click="emit('openMap')"
      >
        Voir sur carte
      </v-btn>
    </v-card-title>
    <v-card-text class="pa-6">
      <!-- Adresse -->
      <div class="location-section mb-4">
        <div class="location-row">
          <div class="location-icon-wrapper">
            <v-icon icon="mdi-home" size="24" color="primary" />
          </div>
          <div class="location-details">
            <div class="location-label">Adresse</div>
            <div class="location-value">{{ address }}</div>
          </div>
        </div>
      </div>

      <v-divider class="my-4" />

      <!-- Distance et temps -->
      <div class="metrics-row">
        <div class="metric-item">
          <div class="metric-icon-wrapper" style="background: #dbeafe;">
            <v-icon icon="mdi-map-marker-distance" size="20" color="#3b82f6" />
          </div>
          <div class="metric-content">
            <div class="metric-label">Distance</div>
            <div class="metric-value">{{ distance }} <span class="metric-unit">km</span></div>
          </div>
        </div>

        <div class="metric-item">
          <div class="metric-icon-wrapper" style="background: #d1fae5;">
            <v-icon icon="mdi-clock-outline" size="20" color="#10b981" />
          </div>
          <div class="metric-content">
            <div class="metric-label">Temps estimé</div>
            <div class="metric-value">{{ estimatedTime }} <span class="metric-unit">min</span></div>
          </div>
        </div>
      </div>

      <!-- Statut distance -->
      <div class="distance-status-wrapper mt-4">
        <v-chip
          :color="distanceStatusColor"
          variant="flat"
          size="default"
          block
          class="distance-status-chip"
        >
          <v-icon :icon="distanceStatusIcon" size="18" class="mr-2" />
          {{ distanceStatusLabel }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  address: string
  distance: number
  estimatedTime: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  openMap: []
}>()

// Statut de distance
const distanceStatusColor = computed(() => {
  if (props.distance > 10) return 'error'
  if (props.distance > 5) return 'warning'
  return 'success'
})

const distanceStatusLabel = computed(() => {
  if (props.distance > 10) return 'Patient éloigné'
  if (props.distance > 5) return 'Distance moyenne'
  return 'Patient à proximité'
})

const distanceStatusIcon = computed(() => {
  if (props.distance > 10) return 'mdi-alert-circle'
  if (props.distance > 5) return 'mdi-information'
  return 'mdi-check-circle'
})
</script>

<style scoped>
.location-card {
  background: white;
  border: 1px solid #f0f0f0;
  height: 100%;
}

.card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Section adresse */
.location-section {
  padding: 0;
}

.location-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.location-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #d5f5ea 0%, #a8e6d1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.location-details {
  flex: 1;
  min-width: 0;
}

.location-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.location-value {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  word-wrap: break-word;
}

/* Métriques distance/temps */
.metrics-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 12px;
}

.metric-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-label {
  font-size: 11px;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
  line-height: 1;
}

.metric-unit {
  font-size: 12px;
  font-weight: 500;
  color: #7f8c8d;
  margin-left: 2px;
}

/* Statut distance */
.distance-status-wrapper {
  display: flex;
  justify-content: center;
}

.distance-status-chip {
  font-weight: 600;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 600px) {
  .metrics-row {
    grid-template-columns: 1fr;
  }

  .location-value {
    font-size: 15px;
  }

  .metric-value {
    font-size: 18px;
  }
}
</style>
