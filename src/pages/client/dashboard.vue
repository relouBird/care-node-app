<route lang="yaml">
meta:
  layout: client
</route>

<template>
  <div>
    <v-row>
      <!-- Statistiques en cartes -->
      <v-col cols="12" md="3" v-for="stat in stats" :key="stat.title">
        <v-card class="stat-card shadow-boxed" rounded="xl">
          <v-card-text>
            <div class="stat-icon" :style="{ background: stat.color }">
              <v-icon :icon="stat.icon" color="white" size="24" />
            </div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-title">{{ stat.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Graphique ou autres contenus -->
      <v-col cols="12" md="8">
        <v-card rounded="xl" class="shadow-boxed" elevation="2">
          <v-card-title class="card-title"> Activité récente </v-card-title>
          <v-card-text>
            <div class="empty-state">
              <v-icon icon="mdi-chart-line" size="64" color="primary" />
              <p class="mt-4">Vos graphiques d'activité apparaîtront ici</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Liste des patients récents -->
      <v-col cols="12" md="4">
        <v-card rounded="xl" class="shadow-boxed" elevation="2">
          <v-card-title class="card-title"> Patients récents </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="i in 5" :key="i" class="patient-item">
                <template v-slot:prepend>
                  <v-avatar color="primary" size="40">
                    <span class="text-white">{{ i }}</span>
                  </v-avatar>
                </template>
                <v-list-item-title>Patient {{ i }}</v-list-item-title>
                <v-list-item-subtitle
                  >Dernière visite: {{ i }} jour(s)</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Rendez-vous du jour -->
      <v-col cols="12">
        <v-card class="shadow-boxed" rounded="xl" elevation="2">
          <v-card-title class="card-title"> Rendez-vous du jour </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Heure</th>
                  <th>Patient</th>
                  <th>Type</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 3" :key="i">
                  <td>{{ 8 + i }}:00</td>
                  <td>Patient {{ i }}</td>
                  <td>Consultation</td>
                  <td>
                    <v-chip color="success" size="small"> Confirmé </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const stats = [
  {
    title: "Patients totaux",
    value: "248",
    icon: "mdi-account-multiple",
    color: "linear-gradient(135deg, #13875d 0%, #1ba876 100%)",
  },
  {
    title: "Rendez-vous",
    value: "12",
    icon: "mdi-calendar-clock",
    color: "linear-gradient(135deg, #3498db 0%, #5dade2 100%)",
  },
  {
    title: "En attente",
    value: "5",
    icon: "mdi-clock-outline",
    color: "linear-gradient(135deg, #f39c12 0%, #f5b041 100%)",
  },
  {
    title: "Terminés",
    value: "7",
    icon: "mdi-check-circle",
    color: "linear-gradient(135deg, #27ae60 0%, #52be80 100%)",
  },
];
</script>

<style scoped>

.stat-card {
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.shadow-boxed {
  box-shadow:
    0 -4px 20px rgba(0, 0, 0, 0.04),
    0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
  font-family: "Montserrat", sans-serif;
}

.stat-title {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 500;
}

.card-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

.patient-item {
  border-bottom: 1px solid #e5eaef;
}

.patient-item:last-child {
  border-bottom: none;
}
</style>
