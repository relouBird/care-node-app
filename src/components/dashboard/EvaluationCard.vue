<template>
  <v-card rounded="xl" elevation="0" class="ambient-card shadow-boxed">
    <v-card-title class="card-title">
      <div class="d-flex align-center gap-2">
        <v-icon icon="mdi-thermometer" color="warning" />
        <span>Température Ambiante</span>
      </div>
    </v-card-title>
    <v-card-text class="pa-6">
      <!-- Température principale -->
      <div class="temp-main">
        <div class="temp-value">{{ temperature }}°C</div>
        <v-chip
          :color="tempStatus.color"
          variant="flat"
          size="default"
          class="temp-chip"
        >
          <v-icon :icon="tempStatus.icon" size="18" class="mr-1" />
          {{ tempStatus.label }}
        </v-chip>
      </div>

      <v-divider class="my-4" />

      <!-- Statuts additionnels -->
      <div class="status-grid">
        <!-- Proximité patient -->
        <div class="status-item">
          <div class="status-header">
            <v-icon icon="mdi-map-marker-radius" size="20" :color="proximityStatus.color" />
            <span class="status-label">Proximité</span>
          </div>
          <v-chip
            :color="proximityStatus.color"
            variant="tonal"
            size="small"
            class="mt-2"
          >
            {{ proximityStatus.label }}
          </v-chip>
        </div>

        <!-- Paramètres vitaux -->
        <div class="status-item">
          <div class="status-header">
            <v-icon icon="mdi-heart-pulse" size="20" :color="vitalStatus.color" />
            <span class="status-label">Paramètres</span>
          </div>
          <v-chip
            :color="vitalStatus.color"
            variant="tonal"
            size="small"
            class="mt-2"
          >
            {{ vitalStatus.label }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  temperature: number
  distance: number // en km
  heartRate: number // bpm
  oxygen: number // %
  bodyTemp: number // °C
}

const props = defineProps<Props>()

// Statut température ambiante
const tempStatus = computed(() => {
  const temp = props.temperature

  if (temp < 18 || temp > 26) {
    return {
      label: 'Non optimal',
      color: 'warning',
      icon: 'mdi-alert'
    }
  } else if (temp < 20 || temp > 24) {
    return {
      label: 'Acceptable',
      color: 'info',
      icon: 'mdi-information'
    }
  }
  return {
    label: 'Optimal',
    color: 'success',
    icon: 'mdi-check-circle'
  }
})

// Statut proximité
const proximityStatus = computed(() => {
  const distance = props.distance

  if (distance > 10) {
    return {
      label: 'Loin',
      color: 'error'
    }
  } else if (distance > 5) {
    return {
      label: 'Moyen',
      color: 'warning'
    }
  }
  return {
    label: 'Proche',
    color: 'success'
  }
})

// Statut paramètres vitaux
const vitalStatus = computed(() => {
  const { heartRate, oxygen, bodyTemp } = props

  // Conditions critiques
  if (heartRate > 100 || oxygen < 90 || bodyTemp > 38) {
    return {
      label: 'Urgence',
      color: 'error'
    }
  }

  // Conditions à surveiller
  if (heartRate > 90 || oxygen < 95 || bodyTemp > 37.5) {
    return {
      label: 'Surveillance',
      color: 'warning'
    }
  }

  return {
    label: 'Stable',
    color: 'success'
  }
})
</script>

<style scoped>
.ambient-card {
  background: white;
  border: 1px solid #f0f0f0;
  height: 100%;
}

.card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
}

/* Température principale */
.temp-main {
  text-align: center;
  padding: 8px 0;
}

.temp-value {
  font-size: 56px;
  font-weight: 700;
  color: #f59e0b;
  font-family: 'Montserrat', sans-serif;
  line-height: 1;
  margin-bottom: 12px;
}

.temp-chip {
  font-weight: 500;
}

/* Grille des statuts */
.status-grid {
  display: flex;
  justify-content: space-around;
}

.status-item {
  text-align: center;
}

.status-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 4px;
}

.status-label {
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
}

/* Responsive */
@media (max-width: 600px) {
  .temp-value {
    font-size: 48px;
  }

  .status-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
