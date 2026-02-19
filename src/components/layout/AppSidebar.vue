<template>
  <v-navigation-drawer
    permanent
    class="sidebar"
    :width="!modelValue ? 280 : 80"
    elevation="0"
  >
    <!-- Logo et titre -->
    <div class="sidebar-header">
      <div>
        <v-img :src="logo" alt="Care Node" width="50" class="" />
      </div>
      <transition name="fade-slide">
        <div v-if="!modelValue" class="name-wrapper">
          <v-img :src="name" alt="Care Node Name" width="145" />
        </div>
      </transition>
    </div>

    <v-divider class="my-4" />

    <!-- Navigation items -->
    <v-list nav class="sidebar-nav">
      <v-list-item
        v-for="item in navItems"
        :key="item.value"
        :to="item.to"
        :value="item.value"
        rounded="xl"
        class="nav-item"
        v-if="!modelValue"
      >
        <template v-slot:prepend>
          <component :is="item.icon" :size="25" class="nav-icon ml-1 mr-3" />
        </template>
        <v-list-item-title class="nav-title">
          {{ item.label }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="item in navItems"
        :key="item.value + 1"
        :to="item.to"
        :value="item.value"
        rounded="circle"
        class="nav-item retract d-flex align-center justify-center"
        v-else
      >
        <div class="retract">
          <component :is="item.icon" :size="25" class="nav-icon ml-1 mr-3" />
        </div>
      </v-list-item>
    </v-list>

    <!-- Footer de la sidebar -->
    <template v-slot:append>
      <div :class="['sidebar-footer', !modelValue ? '' : 'pa-2 px-3']">
        <v-divider class="mb-4" />

        <!-- User info -->
        <div class="user-info">
          <v-avatar :size="!modelValue ? 48 : 32" color="primary">
            <v-icon icon="mdi-account" />
          </v-avatar>
          <div class="user-details" v-if="!modelValue">
            <div class="user-name">Super Admin</div>
            <div class="user-role">Administrateur</div>
          </div>
        </div>

        <!-- Logout button -->
        <v-btn
          variant="tonal"
          color="error"
          class="logout-btn"
          rounded="lg"
          @click="handleLogout"
          block
          v-if="!modelValue"
        >
          <span class="pr-3">Déconnexion</span>
          <icon-logout2 color="#e74c3c" size="24" />
        </v-btn>
        <v-btn
          variant="tonal"
          color="error"
          class="logout-btn"
          @click="handleLogout"
          rounded="lg"
          icon
          block
          v-else
        >
          <icon-logout2 color="#e74c3c" size="24" />
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo-strong.svg";
import name from "@/assets/images/name.svg";
import { desktopNavigationItems } from "@/constants/navigation.constant";
import {
  IconLogout2,
} from "@tabler/icons-vue";

type StateType = {
  modelValue: boolean;
};

const props = defineProps<StateType>();

const router = useRouter();

const emit = defineEmits(["update:modelValue"]);

const navItems = shallowRef(desktopNavigationItems);

// Variables reactives
const modelValue = computed({
  get: () => props.modelValue || false,
  set: (value) => emit("update:modelValue", value),
});

// Fonction de déconnexion (placeholder)
const handleLogout = () => {
  // Logique de déconnexion ici (ex: clear tokens, redirect, etc.)
  console.log("Déconnexion en cours...");
  router.push("/auth/login"); // Redirige vers la page de login après déconnexion
};
</script>

<style scoped>
.sidebar {
  background: white !important;
  border-right: 1px solid #e5eaef !important;
}

/* Header */
.sidebar-header {
  padding: 0;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.logo-container {
  width: 48px;
  height: 48px;
  background: red;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.app-title {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #13875d;
}

/* Navigation */
.sidebar-nav {
  padding: 0 12px;
}

.nav-item {
  margin-bottom: 8px;
  font-family: "Montserrat", sans-serif;
}

.retract {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.nav-title {
  font-size: 15px;
  font-weight: 500;
}

.nav-icon {
  transition: all 0.3s ease;
}

:deep(.v-list-item--active) {
  background: linear-gradient(135deg, #13875d 0%, #1ba876 100%) !important;
  color: white !important;
}

:deep(.v-list-item--active .v-icon) {
  color: white !important;
}

:deep(.v-list-item--active .v-list-item-title) {
  color: white !important;
  font-weight: 600;
}

:deep(.v-list-item:not(.v-list-item--active)) {
  color: #7f8c8d;
}

:deep(.v-list-item:not(.v-list-item--active):hover) {
  background: #f0fdf9 !important;
  color: #13875d !important;
}

:deep(.v-list-item:not(.v-list-item--active):hover .v-icon) {
  color: #13875d !important;
}

/* Footer */
.sidebar-footer {
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f0fdf9;
  border-radius: 12px;
  margin-bottom: 12px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  font-family: "Montserrat", sans-serif;
}

.user-role {
  font-size: 12px;
  color: #7f8c8d;
}

.logout-btn {
  text-transform: none;
  font-weight: 500;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
