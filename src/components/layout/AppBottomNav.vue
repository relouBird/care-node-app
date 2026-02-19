<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in navItems"
      :key="item.value"
      :to="item.to"
      class="nav-item"
      :class="{ active: isActive(item.to) }"
    >
      <component :is="item.icon" :size="28" class="nav-icon" />
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { mobileNavigationItems } from '@/constants/navigation.constant'

// Gere les routes actives pour le menu de navigation mobile
const route = useRoute()

// Menu de navigations pour mobile
const navItems = shallowRef(mobileNavigationItems)

const isActive = (path: string) => {
  return route.path.startsWith(path)
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 68%;
  max-width: 500px;
  background: white;
  border-radius: 36px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04), 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  padding: 6px;
  align-items: center;
  z-index: 1000;
  border: 1px solid #e5eaef;
}

.nav-item {
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.nav-item:hover {
  background: #f0fdf9;
  color: #13875d;
}

.nav-item.active {
  background: linear-gradient(135deg, #13875d 0%, #1ba876 100%);
  color: white;
}

.nav-icon {
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-label {
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
}

/* Animation au chargement */
.bottom-nav {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
</style>
