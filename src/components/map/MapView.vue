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
            <span class="info-text">{{ patientLocation.location }}</span>
          </p>
        </div>

        <!-- Infos (responsive) -->
        <div class="info-items" :class="{ 'mobile-items': isMobile }">
          <div class="info-chip" v-if="!isMobile">
            <v-icon icon="mdi-map-marker" color="primary" size="18" />
            <span class="info-text">{{ patientLocation.location }}</span>
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
// Les constantes
import {
  assistantLocate,
  patientAssistantGeometry,
  patientLocate,
} from "@/constants/map.constant";

// Les helpers
import {
  calculateMapDistance,
  drawRouteOnMap,
  MapGenerateCoordinates,
  MapPinByColor,
  MarkerPinCreator,
} from "@/helpers/map.helper";

// Les methodes et données liées à la carte
import maplibregl from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
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
const patientLocation = computed(() => MapGenerateCoordinates(patientLocate));
const assistantLocation = computed(() =>
  MapGenerateCoordinates(assistantLocate),
);

// Données
const distance = computed(() =>
  calculateMapDistance(
    patientLocation.value.coordinates,
    assistantLocation.value.coordinates,
  ).toFixed(2),
);
const estimatedTime = ref(8);

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
    center: patientLocation.value.coordinates,
    zoom: props.isMobile ? 13 : 15,
    pitch: 0,
  });

  // Pin personnalisé style Maps
  const pinEl = MapPinByColor("#13875d");
  const pinEl2th = MapPinByColor("#13875d");

  const patientMarker = MarkerPinCreator(
    pinEl,
    patientLocation.value,
    "Patient",
    "#13875d",
  );

  const assistantMarker = MarkerPinCreator(
    pinEl2th,
    assistantLocation.value,
    "Assistant",
    "#13875d",
  );

  patientMarker.addTo(mapInstance.value);
  assistantMarker.addTo(mapInstance.value);

  // Dessiner la route entre les deux points
  mapInstance.value?.on("load", () => {
    const { source, layer } = drawRouteOnMap(patientAssistantGeometry);
    mapInstance.value.addSource("route", source);
    mapInstance.value.addLayer(layer);
  });
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
