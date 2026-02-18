<template>
  <v-locale-provider>
    <v-app class="auth-layout pa-0 ma-0">
      <v-main class="pa-0 ma-0">
        <v-container fluid class="pa-0">
          <v-row no-gutters class="fill-height">
            <!-- Section gauche - Branding -->
            <v-col
              cols="12"
              md="6"
              class="branding-section d-flex align-center justify-center pa-8"
            >
              <div class="branding-content text-center">
                <!-- Logo animé -->
                <div class="logo-container mb-8">
                  <v-img
                    :src="logo"
                    alt="Care Node Logo"
                    width="120"
                    class="mx-auto logo-pulse"
                  />
                </div>

                <!-- Titre -->
                <v-img
                  :src="name"
                  alt="Care Node Name"
                  width="300px"
                  class="mx-auto care-node-title mb-4"
                />

                <!-- Description -->
                <p class="text-h6 font-weight-light mb-8 description-text">
                  Gestion des personnes âgées<br />
                  Simple • Efficace • Sécurisé
                </p>

                <!-- Statistiques -->
                <v-row class="stats-row justify-center">
                  <v-col cols="4" class="text-center">
                    <div class="stat-number">3+</div>
                    <div class="stat-label">Capteurs</div>
                  </v-col>
                  <v-col cols="4" class="text-center">
                    <div class="stat-number">99%</div>
                    <div class="stat-label">Fiabilité</div>
                  </v-col>
                  <v-col cols="4" class="text-center">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Support</div>
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <!-- Section droite - Formulaire -->
            <v-col
              cols="12"
              md="6"
              :class="['form-section d-flex align-center justify-center', $vuetify.display.smAndDown ? '' : ' pa-8']"
            >
              <div
                :class="[
                  'login-card',
                  $vuetify.display.smAndDown ? '' : 'effect pa-12 elevation-0 border-none',
                ]"
                max-width="450"
                width="100%"
                rounded="xl"
              >
                <router-view />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<script setup lang="ts">
// Logo...
import logo from "@/assets/images/logo-white.svg";
import name from "@/assets/images/name-white.svg";
// Layout minimaliste pour les pages d'authentification
</script>

<style scoped>
.auth-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #e4fcf4 0%, #f0fdf9 100%);
}

/* Section branding (gauche) */
.branding-section {
  background: linear-gradient(135deg, #13875d 0%, #1ba876 100%);
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.branding-section::before {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -250px;
  right: -250px;
}

.branding-section::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: -150px;
  left: -150px;
}

.branding-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
}

/* Logo avec animation */
.logo-container {
  animation: fadeInDown 0.8s ease-out;
}

.logo-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.description-text {
  opacity: 0.95;
  line-height: 1.8;
  animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Statistiques */
.stats-row {
  animation: fadeIn 1s ease-out 0.9s both;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Section formulaire (droite) */
.form-section {
  min-height: 100vh;
  backdrop-filter: blur(10px);
}

/* Carte de login */
.login-card {
  width: 100%;
  background: #0000 !important;
}

.login-card.effect {
  animation: slideInRight 0.6s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .branding-section {
    display: none !important;
  }

  .form-section {
    background: linear-gradient(135deg, #e4fcf4 0%, #f0fdf9 100%);
  }
}

@media (max-width: 600px) {
  .login-card {
    margin: 1rem;
  }
}

/* Transitions Vuetify */
:deep(.v-field--focused) {
  box-shadow: 0 0 0 3px rgba(19, 135, 93, 0.1);
}

:deep(.v-btn) {
  transition: all 0.3s ease;
}

:deep(.v-btn:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(19, 135, 93, 0.2);
}
</style>
