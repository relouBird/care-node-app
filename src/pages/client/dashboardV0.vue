<route lang="yaml">
meta:
  layout: client
</route>

<template>
  <div class="dashboard">
    <!-- Header avec info patient -->
    <div class="dashboard-header mb-6">
      <div>
        <h1 class="dashboard-title">Tableau de bord Patient</h1>
        <p class="dashboard-subtitle">Dernière mise à jour : {{ lastUpdate }}</p>
      </div>

      <!-- Badge statut urgence -->
      <div class="urgency-badges">
        <v-chip
          :color="healthUrgency.color"
          variant="flat"
          size="large"
          prepend-icon="mdi-heart-pulse"
        >
          {{ healthUrgency.label }}
        </v-chip>
        <v-chip
          :color="distanceUrgency.color"
          variant="flat"
          size="large"
          prepend-icon="mdi-map-marker-radius"
        >
          {{ distanceUrgency.label }}
        </v-chip>
      </div>
    </div>

    <!-- Métriques vitales -->
    <v-row class="metrics-grid">
      <v-col
        v-for="metric in vitalMetrics"
        :key="metric.label"
        cols="12"
        sm="6"
        md="6"
        lg="3"
      >
        <health-metric-card
          :label="metric.label"
          :value="metric.value"
          :unit="metric.unit"
          :icon="metric.icon"
          :icon-color="metric.iconColor"
          :icon-background="metric.iconBackground"
          :chart-color="metric.chartColor"
          :chart-data="metric.chartData"
        />
      </v-col>
    </v-row>

    <!-- Température ambiante et Localisation -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="stats-card shadow-boxed">
          <v-card-title class="card-title">
            <div class="d-flex align-center gap-2">
              <v-icon icon="mdi-thermometer" color="warning" />
              <span>Température Ambiante</span>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="ambient-temp-display">
              <div class="temp-value">{{ ambientTemperature }}°C</div>
              <div class="temp-status" :class="ambientTempStatus.class">
                <v-icon :icon="ambientTempStatus.icon" size="20" />
                {{ ambientTempStatus.label }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="stats-card shadow-boxed">
          <v-card-title class="card-title">
            <div class="d-flex align-center gap-2">
              <v-icon icon="mdi-map-marker" color="primary" />
              <span>Localisation</span>
            </div>
            <v-btn
              variant="text"
              size="small"
              color="primary"
              @click="openMap"
            >
              Voir sur carte
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="location-info">
              <div class="location-item">
                <v-icon icon="mdi-home" size="20" color="primary" />
                <span>{{ patientLocation.address }}</span>
              </div>
              <div class="location-item">
                <v-icon icon="mdi-map-marker-distance" size="20" color="primary" />
                <span>Distance : {{ patientLocation.distance }} km</span>
              </div>
              <div class="location-item">
                <v-icon icon="mdi-clock-outline" size="20" color="primary" />
                <span>Temps estimé : {{ patientLocation.estimatedTime }} min</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Alertes et Actions rapides -->
    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="0" class="stats-card shadow-boxed">
          <v-card-title class="card-title">
            <div class="d-flex align-center gap-2">
              <v-icon icon="mdi-alert-circle" color="error" />
              <span>Alertes et Notifications</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-list class="alerts-list">
              <v-list-item
                v-for="alert in alerts"
                :key="alert.id"
                class="alert-item"
                :class="`alert-${alert.severity}`"
              >
                <template v-slot:prepend>
                  <v-icon
                    :icon="alert.icon"
                    :color="alert.color"
                    size="24"
                  />
                </template>
                <v-list-item-title class="alert-title">
                  {{ alert.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ alert.time }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <div v-if="alerts.length === 0" class="empty-alerts">
              <v-icon icon="mdi-check-circle" size="48" color="success" />
              <p class="mt-4">Aucune alerte active</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="0" class="stats-card shadow-boxed">
          <v-card-title class="card-title">
            Actions Rapides
          </v-card-title>
          <v-card-text class="pa-3">
            <div class="quick-actions">
              <v-btn
                color="error"
                size="large"
                block
                rounded="lg"
                class="mb-3"
                prepend-icon="mdi-phone-alert"
                @click="callEmergency"
              >
                Appel d'urgence
              </v-btn>

              <v-btn
                color="primary"
                variant="outlined"
                size="large"
                block
                rounded="lg"
                class="mb-3"
                prepend-icon="mdi-message-text"
                @click="contactPatient"
              >
                Contacter patient
              </v-btn>

              <v-btn
                color="primary"
                variant="outlined"
                size="large"
                block
                rounded="lg"
                class="mb-3"
                prepend-icon="mdi-hospital-box"
                @click="viewMedicalHistory"
              >
                Historique médical
              </v-btn>

              <v-btn
                color="primary"
                variant="outlined"
                size="large"
                block
                rounded="lg"
                prepend-icon="mdi-cog"
                @click="openSettings"
              >
                Paramètres
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IconHeartbeat,
  IconLungs,
  IconThermometer,
  IconMapPin
} from '@tabler/icons-vue'
import HealthMetricCard from '@/components/dashboard/HealthMetricCard.vue'

// Données simulées pour les graphiques (7 dernières mesures)
const heartRateData = [72, 75, 73, 78, 75, 74, 75]
const oxygenData = [98, 97, 98, 96, 97, 98, 97]
const temperatureData = [36.5, 36.7, 36.6, 36.8, 36.7, 36.6, 36.7]
const locationData = [2.5, 2.3, 2.8, 2.5, 2.4, 2.6, 2.5] // Distance en km

const lastUpdate = ref('Il y a 2 minutes')
const ambientTemperature = ref(22)

// Métriques vitales
const vitalMetrics = ref([
  {
    label: 'Fréquence Cardiaque',
    value: '75',
    unit: 'bpm',
    icon: IconHeartbeat,
    iconColor: '#ef4444',
    iconBackground: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    chartColor: '#ef4444',
    chartData: heartRateData
  },
  {
    label: 'Taux d\'Oxygène',
    value: '97',
    unit: '%',
    icon: IconLungs,
    iconColor: '#3b82f6',
    iconBackground: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    chartColor: '#3b82f6',
    chartData: oxygenData
  },
  {
    label: 'Température Corporelle',
    value: '36.7',
    unit: '°C',
    icon: IconThermometer,
    iconColor: '#f59e0b',
    iconBackground: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    chartColor: '#f59e0b',
    chartData: temperatureData
  },
  {
    label: 'Distance',
    value: '2.5',
    unit: 'km',
    icon: IconMapPin,
    iconColor: '#10b981',
    iconBackground: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    chartColor: '#10b981',
    chartData: locationData
  }
])

// Statut d'urgence santé
const healthUrgency = computed(() => {
  // Logique basée sur les métriques vitales
  const heartRate = 75
  const oxygen = 97
  const temp = 36.7

  if (heartRate > 100 || oxygen < 90 || temp > 38) {
    return { label: 'Urgence Santé', color: 'error' }
  } else if (heartRate > 90 || oxygen < 95 || temp > 37.5) {
    return { label: 'Surveillance', color: 'warning' }
  }
  return { label: 'Stable', color: 'success' }
})

// Statut d'urgence distance
const distanceUrgency = computed(() => {
  const distance = 2.5

  if (distance > 10) {
    return { label: 'Loin', color: 'error' }
  } else if (distance > 5) {
    return { label: 'Moyen', color: 'warning' }
  }
  return { label: 'Proche', color: 'success' }
})

// Température ambiante
const ambientTempStatus = computed(() => {
  const temp = ambientTemperature.value

  if (temp < 18 || temp > 26) {
    return {
      label: 'Non optimal',
      class: 'temp-warning',
      icon: 'mdi-alert'
    }
  }
  return {
    label: 'Optimal',
    class: 'temp-ok',
    icon: 'mdi-check-circle'
  }
})

// Localisation patient
const patientLocation = ref({
  address: '123 Rue de la Santé, Douala',
  distance: 2.5,
  estimatedTime: 8
})

// Alertes
const alerts = ref([
  {
    id: 1,
    title: 'Fréquence cardiaque légèrement élevée',
    time: 'Il y a 5 minutes',
    severity: 'warning',
    icon: 'mdi-heart-pulse',
    color: 'warning'
  },
  // Ajouter d'autres alertes ici
])

// Actions
const callEmergency = () => {
  console.log('Appel d\'urgence déclenché')
  // Implémenter la logique d'appel d'urgence
}

const contactPatient = () => {
  console.log('Contacter le patient')
  // Implémenter la logique de contact
}

const viewMedicalHistory = () => {
  console.log('Voir historique médical')
  // Naviguer vers l'historique
}

const openSettings = () => {
  console.log('Ouvrir paramètres')
  // Naviguer vers les paramètres
}

const openMap = () => {
  console.log('Ouvrir carte')
  // Ouvrir la vue carte
}
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.dashboard-subtitle {
  font-size: 14px;
  color: #7f8c8d;
}

.urgency-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Grille des métriques */
.metrics-grid {
  margin-bottom: 0;
}

/* Cartes de stats */
.stats-card {
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

/* Température ambiante */
.ambient-temp-display {
  text-align: center;
  padding: 24px;
}

.temp-value {
  font-size: 48px;
  font-weight: 700;
  color: #f59e0b;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 12px;
}

.temp-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.temp-ok {
  background: #d1fae5;
  color: #10b981;
}

.temp-warning {
  background: #fef3c7;
  color: #f59e0b;
}

/* Localisation */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.location-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #2c3e50;
}

/* Alertes */
.alerts-list {
  padding: 0;
}

.alert-item {
  border-left: 4px solid transparent;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #f9fafb;
}

.alert-item.alert-error {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.alert-item.alert-warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.alert-item.alert-info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.alert-title {
  font-weight: 600;
  color: #2c3e50;
}

.empty-alerts {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
}

/* Actions rapides */
.quick-actions {
  display: flex;
  flex-direction: column;
}

/* Responsive */
@media (max-width: 960px) {
  .dashboard-title {
    font-size: 24px;
  }

  .urgency-badges {
    width: 100%;
  }

  .urgency-badges .v-chip {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-title {
    font-size: 22px;
  }

  .temp-value {
    font-size: 40px;
  }
}
</style>
