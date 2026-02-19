<template>
  <v-app class="prototype">
    <!-- Sidebar pour desktop uniquement -->
    <AppSidebar v-if="!isMobile" v-model:model-value="retract" />

    <!-- Top bar pour desktop uniquement -->
    <AppTopBar v-if="!isMobile" v-model:model-value="retract" />

    <AppTopBarMobile v-if="isMobile" />

    <!-- Contenu principal -->
    <v-main class="py-0 main-content" :class="{ 'mobile-padding': isMobile }">
      <v-container fluid class="content-container">
        <div :class="[isMobile ? 'dashboard-header' : '']"></div>
        <router-view />
      </v-container>
    </v-main>

    <!-- Bottom navigation pour mobile uniquement -->
    <AppBottomNav v-if="isMobile" />
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppTopBar from "@/components/layout/AppTopbar.vue";
import AppBottomNav from "@/components/layout/AppBottomNav.vue";
import AppTopBarMobile from "@/components/layout/AppTopBarMobile.vue";

const { mobile, smAndDown, mdAndDown } = useDisplay();

// Variables reactives
const isMobile = ref(mobile.value);
const retract = ref<boolean>(false);

// Méthodes
const updateMobile = () => {
  isMobile.value = window.innerWidth <= 600;
};

onMounted(() => {
  updateMobile();
  window.addEventListener("resize", updateMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMobile);
});

// Met à jour automatiquement selon la taille écran
// Si écran ≤ md → sidebar repliée automatiquement
watch(
  retract,
  (val) => {
    if(mdAndDown.value) {
      retract.value = true;
    } else {
      retract.value = val;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.dashboard-header {
  height: 4.75rem;
}

.prototype {
  width: 100%;
  position: relative;
}

.main-content {
  height: calc(100vh - 4.75rem);
  margin-top: 4.75rem;
  overflow-y: scroll;
  background: linear-gradient(135deg, #e4fcf4 0%, #f0fdf9 100%) !important;
}

.mobile-padding {
  height: 100vh;
  margin-top: 0;
  padding-bottom: 70px !important;
}

.content-container {
  padding: 24px;
  max-width: 1400px;
}

@media (max-width: 960px) {
  .content-container {
    padding: 16px;
  }
}
</style>
