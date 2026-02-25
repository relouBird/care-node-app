<route lang="yaml">
meta:
  layout: client
</route>

<template>
  <div class="location-page">
    <!-- Header (desktop uniquement) -->
    <div v-if="!isMobile" class="page-header mb-6">
      <div>
        <h1 class="page-title">Localisation du Patient</h1>
        <p class="page-subtitle">Suivez la position en temps réel</p>
      </div>
      <div class="d-flex ga-2">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-refresh"
          @click="refreshLocation"
        >
          Actualiser
        </v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-directions"
          @click="openDirections"
        >
          Itinéraire
        </v-btn>
      </div>
    </div>

    <!-- Composant carte -->
    <map-view :is-mobile="isMobile" />

    <!-- Actions rapides mobile -->
    <div v-if="isMobile" class="mobile-actions">
      <v-btn
        color="primary"
        size="large"
        block
        rounded="lg"
        prepend-icon="mdi-directions"
        @click="openDirections"
      >
        Obtenir l'itinéraire
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'
import MapView from '@/components/map/MapView.vue'

const { mobile } = useDisplay()
const isMobile = ref(mobile.value)

// Position du patient
const patientLocation = [9.7338423, 4.0814981]

const updateMobile = () => {
  isMobile.value = window.innerWidth <= 600
}

onMounted(() => {
  updateMobile()
  window.addEventListener('resize', updateMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
})

const refreshLocation = () => {
  console.log('Actualisation de la localisation...')
  // TODO: Implémenter le refresh
}

const openDirections = () => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${patientLocation[1]},${patientLocation[0]}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.location-page {
  max-width: 1400px;
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
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 14px;
  color: #7f8c8d;
}

/* Actions mobiles */
.mobile-actions {
  padding-top: 8px;
}

@media (max-width: 600px) {
  .location-page {
    padding: 0;
  }
}
</style>
