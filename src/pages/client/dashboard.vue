<route lang="yaml">
meta:
  layout: client
</route>

<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header mb-6">
      <div>
        <h1 class="dashboard-title">Vos Métriques de Santé</h1>
        <p class="dashboard-subtitle">Dernière mise à jour : Aujourd'hui</p>
      </div>
      <v-btn
        variant="text"
        color="primary"
        prepend-icon="mdi-filter-variant"
        class="filter-btn"
      >
        Dernières
        <v-icon icon="mdi-chevron-down" size="20" class="ml-1" />
      </v-btn>
    </div>

    <!-- Métriques de santé -->
    <v-row class="metrics-grid">
      <v-col
        v-for="metric in healthMetrics"
        :key="metric.label"
        cols="12"
        sm="6"
        md="6"
        lg="6"
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
    <evaluation-card
      :temperature="22"
      :distance="2.5"
      :heart-rate="75"
      :oxygen="97"
      :body-temp="36.7"
    />
  </v-col>

  <v-col cols="12" md="6">
    <location-statement-card
      address="123 Rue de la Santé, Douala"
      :distance="2.5"
      :estimated-time="8"
      @open-map="openMap"
    />
  </v-col>
</v-row>

  </div>
</template>

<script setup lang="ts">
import HealthMetricCard from "@/components/dashboard/HealthMetricCard.vue";
import EvaluationCard from "@/components/dashboard/EvaluationCard.vue";
import LocationStatementCard from "@/components/dashboard/LocationStatementCard.vue";

import {
  dashboardMetrics,
} from "@/constants/dashboard.constant";

const router = useRouter()

// Données de démonstration pour les métriques de santé et les objectifs quotidiens
const healthMetrics = ref(dashboardMetrics);

// Méthodes utiles
const openMap = () => {
  console.log('Ouvrir la carte')
  router.push('/client/map')
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
  font-family: "Montserrat", sans-serif;
  margin-bottom: 4px;
}

.dashboard-subtitle {
  font-size: 14px;
  color: #7f8c8d;
}

.filter-btn {
  text-transform: none;
  font-weight: 500;
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
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

/* Goals list */
.goals-list {
  padding: 0;
}

.goal-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
}

.goal-item:last-child {
  border-bottom: none;
}

.goal-title {
  font-weight: 600;
  color: #2c3e50;
}

/* Patients list */
.patient-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0;
}

.patient-item:last-child {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 960px) {
  .dashboard-title {
    font-size: 24px;
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

  .filter-btn {
    align-self: stretch;
  }
}
</style>
