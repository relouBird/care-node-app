<route lang="yaml">
meta:
  layout: auth
</route>

<script setup lang="ts">
import logo from "@/assets/images/logo.svg";
import name from "@/assets/images/name.svg";
import useForm from "@/composables/useForm";
import { useSeoHead } from "@/composables/useSeoHead";
import useAuthStore from "@/stores/auth.store";
import * as yup from "yup";
import { useDisplay } from "vuetify";
import { IconShieldCheck, IconRefresh } from "@tabler/icons-vue";

const { mobile } = useDisplay();

useSeoHead({
  title: "Vérification",
  subtitle: "Vérifiez votre compte",
  forcePrefix: true,
});

//store
const authStore = useAuthStore();
const store = storeToRefs(authStore);

// Refs
const valid = ref(false);
const loading = ref(false);

// OTP length based on screen size
const otpLength = computed(() => (mobile.value ? 4 : 6));

// Créer un formulaire réactif
const form = useForm(
  yup.object().shape({
    otp: yup.string().min(4, "Code incomplet").required("Le code est requis"),
  }),
);

// Méthodes
const handleLogin = async () => {
  loading.value = true;
  try {
    await form.submit(async () => await authStore.verifyOTP(form.data.otp));
    form.clear();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const resendCode = async () => {
  console.log("Renvoyer le code");
  try {
    await authStore.sendOTP(store.identifier.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <v-card
      :class="[
        'login-card elevation-0',
        $vuetify.display.smAndDown ? '' : 'effect',
      ]"
      border="none"
      rounded="xl"
    >
      <!-- Logo mobile -->
      <v-card-title v-if="$vuetify.display.smAndDown">
        <div class="text-center w-100 pt-7 d-flex flex-column align-center">
          <img :src="logo" alt="Logo" class="mb-2" width="60" />
          <img :src="name" alt="CareNode" width="140" />
        </div>
      </v-card-title>

      <v-card-text
        :class="$vuetify.display.smAndDown ? 'pa-6 pt-3' : 'pa-8 pt-3'"
      >
        <!-- En-tête -->
        <div class="text-center mb-6">
          <div
            class="verification-icon mb-4"
            v-if="!$vuetify.display.smAndDown"
          >
            <IconShieldCheck size="48" color="#13875d" />
          </div>

          <h2
            :class="$vuetify.display.smAndDown ? 'text-h5' : 'text-h4'"
            class="font-weight-semibold mb-2 text-primary"
          >
            Vérification
          </h2>
          <p
            :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'"
            class="text-medium-emphasis px-2"
          >
            Entrez le code de vérification reçu par email
          </p>
          <p class="text-caption text-medium-emphasis mt-1">
            <v-icon icon="mdi-email" size="14" class="mr-1" />
            ******{{ authStore.identifier.slice(7) }}
          </p>
        </div>

        <!-- Formulaire -->
        <v-form ref="loginForm" v-model="valid" @submit.prevent="handleLogin">
          <!-- OTP Input avec design premium -->
          <div class="otp-wrapper mb-2">
            <v-otp-input
              type="number"
              v-model="form.data.otp"
              :error-messages="form.errors.otp"
              :length="otpLength"
              rounded="xl"
              :max-width="$vuetify.display.mdAndUp ? '640px' : ''"
              variant="outlined"
              :class="[
                $vuetify.display.smAndDown ? 'otp-mobile' : 'otp-desktop',
                'otp-premium',
                { 'otp-error': form.errors.otp },
              ]"
              @update:model-value="form.validateField('otp')"
            />
          </div>

          <!-- Message d'erreur avec animation -->
          <transition name="fade-slide">
            <div v-if="form.errors.otp" class="text-center mb-4">
              <v-alert
                type="error"
                variant="tonal"
                density="compact"
                class="error-alert"
                icon="mdi-alert-circle-outline"
              >
                {{ form.errors.otp }}
              </v-alert>
            </div>
          </transition>

          <!-- Bouton de vérification premium -->
          <v-btn
            type="submit"
            color="primary"
            :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
            block
            rounded="lg"
            :loading="loading"
            class="mb-4 text-none verify-btn"
          >
            <span
              :class="$vuetify.display.smAndDown ? 'text-body-1' : 'text-h6'"
              class="font-weight-medium"
            >
              Vérifier
            </span>
            <template v-slot:loader>
              <v-progress-circular indeterminate size="24" color="white" />
            </template>
          </v-btn>

          <!-- Renvoyer le code avec animation hover -->
          <div class="text-center mb-4">
            <v-btn
              variant="text"
              color="primary"
              class="resend-btn text-none"
              @click="resendCode"
              :ripple="false"
            >
              <IconRefresh size="18" class="mr-1" />
              Renvoyer le code
            </v-btn>
          </div>
        </v-form>

        <!-- Retour à la connexion -->
        <div class="text-center">
          <p
            :class="$vuetify.display.smAndDown ? 'text-caption' : 'text-body-2'"
          >
            <span class="text-medium-emphasis">Vous avez déjà un compte ?</span>
            <router-link
              to="/auth/login"
              class="text-decoration-none text-primary font-weight-medium ml-1"
            >
              Connectez-vous
            </router-link>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
/* Carte de login */
.login-card {
  animation: slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  font-family: "Montserrat", sans-serif;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

.login-card.effect {
  background: transparent !important;
  backdrop-filter: none;
  box-shadow: none !important;
}

/* Icône de vérification */
.verification-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    rgba(19, 135, 93, 0.1) 0%,
    rgba(168, 230, 209, 0.2) 100%
  );
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
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

/* OTP Wrapper */
.otp-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

/* Classes communes pour l'OTP premium */
:deep(.otp-premium .v-field) {
  transition: all 0.2s ease;
  border: 2px solid transparent;
  background: rgba(19, 135, 93, 0.05) !important;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.otp-premium .v-field:hover) {
  border-color: #13875d;
  background: rgba(19, 135, 93, 0.1) !important;
  transform: translateY(-2px);
  box-shadow:
    0 10px 15px -3px rgba(19, 135, 93, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

:deep(.otp-premium .v-field--focused) {
  border-color: #13875d;
  border-width: 2px;
  background: white !important;
  box-shadow:
    0 0 0 4px rgba(19, 135, 93, 0.2),
    0 10px 15px -3px rgba(19, 135, 93, 0.3);
  transform: translateY(-2px);
}

:deep(.otp-premium .v-field--error) {
  border-color: #e74c3c !important;
  background: rgba(231, 76, 60, 0.05) !important;
}

:deep(.otp-premium .v-field--error:hover) {
  border-color: #c0392b !important;
  background: rgba(231, 76, 60, 0.1) !important;
}

:deep(.otp-premium .v-field__input) {
  text-align: center;
  font-weight: 600;
  caret-color: #13875d;
}

/* Style spécifique pour desktop (6 chiffres) */
:deep(.otp-desktop) {
  gap: 16px;
}

:deep(.otp-desktop .v-field) {
  width: 56px;
  height: 64px;
}

:deep(.otp-desktop .v-field__input) {
  font-size: 28px;
  min-height: 64px;
}

/* Style spécifique pour mobile (4 chiffres) */
:deep(.otp-mobile) {
  gap: 12px;
  max-width: 340px;
  margin: 0 auto;
}

:deep(.otp-mobile .v-field) {
  width: 70px;
  height: 70px;
}

:deep(.otp-mobile .v-field__input) {
  font-size: 32px;
  min-height: 70px;
}

/* Animation d'erreur */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.error-alert {
  border-radius: 12px;
  font-size: 14px;
  margin-top: 8px;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

/* Bouton de vérification */
.verify-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #13875d 0%, #0e6b49 100%) !important;
  border: none;
  box-shadow:
    0 10px 15px -3px rgba(19, 135, 93, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.verify-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 20px 25px -5px rgba(19, 135, 93, 0.4),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.verify-btn:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px -3px rgba(19, 135, 93, 0.3);
}

/* Bouton renvoyer */
.resend-btn {
  transition: all 0.2s ease;
  opacity: 0.8;
}

.resend-btn:hover {
  opacity: 1;
  background: rgba(19, 135, 93, 0.1) !important;
  transform: scale(1.05);
}

.resend-btn:active {
  transform: scale(0.95);
}

/* Animation d'entrée */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .verification-icon {
    width: 64px;
    height: 64px;
  }

  .otp-wrapper {
    padding: 0 8px;
  }

  :deep(.otp-mobile .v-field) {
    width: 60px;
    height: 60px;
  }

  :deep(.otp-mobile .v-field__input) {
    font-size: 28px;
    min-height: 60px;
  }
}

@media (max-width: 380px) {
  :deep(.otp-mobile) {
    gap: 8px;
  }

  :deep(.otp-mobile .v-field) {
    width: 52px;
    height: 52px;
  }

  :deep(.otp-mobile .v-field__input) {
    font-size: 24px;
    min-height: 52px;
  }
}

/* Désactiver les flèches dans les inputs number */
:deep(
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button
) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(input[type="number"]) {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
