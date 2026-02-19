<template>
  <v-card class="health-metric-card shadow-boxed" rounded="xl" elevation="0">
    <v-card-text class="pa-4">
      <div class="metric-content">
        <!-- Icône et données -->
        <div class="metric-info">
          <div class="metric-icon" :style="{ background: iconBackground }">
            <component :is="icon" :size="20" :color="iconColor" />
          </div>
          <div class="metric-data">
            <div class="metric-label">{{ label }}</div>
            <div class="metric-value">
              {{ value }}
              <span class="metric-unit">{{ unit }}</span>
            </div>
          </div>
        </div>

        <!-- Mini graphique -->
        <div class="metric-chart">
          <svg :width="chartWidth" :height="chartHeight" viewBox="0 0 100 40">
            <defs>
              <linearGradient
                :id="`${gradientId}`"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  :stop-color="chartColor"
                  stop-opacity="0.25"
                />
                <stop offset="100%" :stop-color="chartColor" stop-opacity="0" />
              </linearGradient>
            </defs>

            <!-- Zone remplie -->
            <path
              :d="`${chartPath} L 100 40 L 0 40 Z`"
              :fill="`url(#${gradientId})`"
              stroke="none"
            />

            <!-- Ligne principale -->
            <path
              :d="chartPath"
              :stroke="chartColor"
              stroke-width="2.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label: string;
  value: string | number;
  unit: string;
  icon: any;
  iconColor: string;
  iconBackground: string;
  chartColor: string;
  chartData: number[];
}

const props = defineProps<Props>();

const chartWidth = 80;
const chartHeight = 40;

// Générer le path SVG pour le mini graphique
const chartPath = computed(() => {
  const data = props.chartData;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = chartHeight - ((value - min) / range) * (chartHeight - 8);
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
});

const gradientId = computed(
  () => `gradient-${props.label.replace(/'/g, "").replace(/\s+/g, "-").toLowerCase()}`,
);
</script>

<style scoped>
.health-metric-card {
  background: white;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: visible;
}

.health-metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(19, 135, 93, 0.12) !important;
}

.metric-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.metric-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-data {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metric-label {
  font-size: 13px;
  color: #7f8c8d;
  font-weight: 500;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  font-family: "Montserrat", sans-serif;
  line-height: 1;
}

.metric-unit {
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
  margin-left: 4px;
}

.metric-chart {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .metric-value {
    font-size: 22px;
  }

  .metric-label {
    font-size: 12px;
  }
}
</style>
