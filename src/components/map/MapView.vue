<template>
  <div class="map-wrapper">
    <v-card
      rounded="xl"
      elevation="0"
      class="map-card"
      :class="{ 'mobile-card': isMobile }"
    >
      <!-- Header avec infos patient -->
      <div class="patient-info-bar" :class="{ 'mobile-bar': isMobile }">
        <!-- Avatar + Nom -->
        <div class="d-flex justify-space-between align-end">
          <div class="d-flex align-center ga-3">
            <v-avatar color="primary" :size="isMobile ? 36 : 40">
              <v-icon icon="mdi-account" color="white" />
            </v-avatar>
            <div>
              <div
                :class="isMobile ? 'text-body-2' : 'text-body-1'"
                class="font-weight-semibold"
              >
                Patient
              </div>
              <div class="text-caption text-medium-emphasis">
                Douala, Cameroun
              </div>
            </div>
          </div>

          <p v-if="isMobile">
            <span class="info-text">{{ coordinates }}</span>
          </p>
        </div>

        <!-- Infos (responsive) -->
        <div class="info-items" :class="{ 'mobile-items': isMobile }">
          <div class="info-chip" v-if="!isMobile">
            <v-icon icon="mdi-map-marker" color="primary" size="18" />
            <span class="info-text">{{ coordinates }}</span>
          </div>

          <div class="info-chip">
            <v-icon icon="mdi-map-marker-distance" color="info" size="18" />
            <span class="info-text">{{ distance }} km</span>
          </div>

          <div class="info-chip">
            <v-icon icon="mdi-clock-outline" color="warning" size="18" />
            <span class="info-text">{{ estimatedTime }} min</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-flex ga-2" :class="{ 'd-none': isMobile }">
          <v-btn icon variant="text" size="small" @click="centerOnPatient">
            <v-icon icon="mdi-crosshairs-gps" />
          </v-btn>

          <v-btn icon variant="text" size="small" @click="togglePitch">
            <v-icon
              :icon="isPitched ? 'mdi-rotate-3d-variant' : 'mdi-rotate-3d'"
            />
          </v-btn>
        </div>
      </div>

      <v-divider />

      <!-- Container de la carte -->
      <div
        ref="mapContainer"
        class="map-display"
        :class="{ 'mobile-map': isMobile }"
      />

      <!-- Boutons flottants mobile -->
      <div v-if="isMobile" class="mobile-controls">
        <v-btn
          icon
          color="white"
          size="small"
          elevation="4"
          @click="centerOnPatient"
        >
          <v-icon icon="mdi-crosshairs-gps" color="primary" />
        </v-btn>

        <v-btn
          icon
          color="white"
          size="small"
          elevation="4"
          @click="togglePitch"
        >
          <v-icon
            :icon="isPitched ? 'mdi-rotate-3d-variant' : 'mdi-rotate-3d'"
            color="primary"
          />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import maplibregl from "maplibre-gl";
import type { Map, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  isMobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
});

const mapContainer = ref<HTMLElement | null>(null);
// const mapInstance = ref<Map | null>(null); // Eviter les problèmes de typage avec Maplibre
const mapInstance = ref<any | null>(null);
const isPitched = ref(false);

// Position du patient (Douala, Cameroun)
const patientLocation: [number, number] = [9.7338423, 4.0814981];

// Données
const distance = ref(2.5);
const estimatedTime = ref(8);

const coordinates = computed(() => {
  if (patientLocation[1] && patientLocation[0]) {
    return `${patientLocation[1].toFixed(4)}°N, ${patientLocation[0].toFixed(4)}°E`;
  }
  return `0°N, 0°E`;
});

onMounted(() => {
  if (!mapContainer.value) return;

  // Les styles
  const mapStyle: StyleSpecification = {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© CartoDB",
      },
    },
    layers: [
      {
        id: "cartodb-positron",
        type: "raster",
        source: "raster-tiles",
      },
    ],
  } as any;

  // Initialiser la carte
  mapInstance.value = new maplibregl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: patientLocation,
    zoom: props.isMobile ? 13 : 14,
    pitch: 0,
  });

  // Pin personnalisé style Maps
  const pinEl = document.createElement("div");
  pinEl.innerHTML = `
<svg width="32" height="40" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Ombre -->
  <ellipse cx="20" cy="48" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
  <!-- Pin -->
  <path d="M20 0 C9 0 0 9 0 20 C0 35 20 50 20 50 C20 50 40 35 40 20 C40 9 31 0 20 0 Z"
        fill="#13875d" stroke="white" stroke-width="2"/>
  <!-- Point central blanc -->
  <circle cx="20" cy="20" r="8" fill="white"/>
  <!-- Icône -->
  <circle cx="20" cy="20" r="5" fill="#13875d"/>
</svg>
  `;
  pinEl.style.width = "40px";
  pinEl.style.height = "50px";
  pinEl.style.cursor = "pointer";

  const marker = new maplibregl.Marker({ element: pinEl, anchor: "bottom" })
    .setLngLat(patientLocation)
    .setPopup(
      new maplibregl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div style="padding: 12px; min-width: 150px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #13875d; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #2c3e50;">Patient</div>
              <div style="font-size: 11px; color: #7f8c8d;">Douala, Cameroun</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #7f8c8d; padding-left: 40px;">
            ${coordinates.value}
          </div>
        </div>
      `),
    );

  marker.addTo(mapInstance.value);
});

onUnmounted(() => {
  mapInstance.value?.remove();
});

// Centrer sur le patient
const centerOnPatient = () => {
  mapInstance.value?.flyTo({
    center: patientLocation,
    zoom: props.isMobile ? 14 : 15,
    duration: 1000,
  });
};

// Toggle inclinaison 3D
const togglePitch = () => {
  if (!mapInstance.value) return;

  const targetPitch = isPitched.value ? 0 : 45;
  isPitched.value = !isPitched.value;

  mapInstance.value.easeTo({
    pitch: targetPitch,
    bearing: isPitched.value ? 20 : 0,
    duration: 800,
  });
};
</script>

<style scoped>
.map-wrapper {
  width: 100%;
}

.map-card {
  background: white;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

/* Barre d'info patient */
.patient-info-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  gap: 24px;
  flex-wrap: wrap;
}

.patient-info-bar.mobile-bar {
  padding: 12px 16px;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}

.info-items {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.info-items.mobile-items {
  /* flex-direction: column; */
  gap: 8px;
  align-items: stretch;
}

.info-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 8px;
  min-width: 0;
}

.mobile-items .info-chip {
  width: 100%;
  justify-content: space-between;
}

.info-text {
  font-size: 13px;
  font-weight: 500;
  color: #2c3e50;
  white-space: nowrap;
}

/* Carte */
.map-display {
  width: 100%;
  height: 440px;
  position: relative;
}

.map-display.mobile-map {
  height: 430px;
}

/* Contrôles mobiles */
.mobile-controls {
  position: absolute;
  bottom: 80px;
  right: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Responsive */
@media (max-width: 600px) {
  .info-text {
    font-size: 12px;
  }
}
</style>
