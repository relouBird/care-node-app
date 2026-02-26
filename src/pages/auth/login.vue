<route lang="yaml">
meta:
  layout: auth
</route>

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
      <v-card-title>
        <div
          v-if="$vuetify.display.smAndDown"
          class="text-center w-100 pt-7 d-flex flex-column align-center"
        >
          <img :src="logo" alt="Logo" class="mb-2" width="60" />
          <img :src="name" alt="CareNode" width="140" />
        </div>
      </v-card-title>

      <v-card-text class="pa-8 pt-3">
        <!-- En-tête du formulaire -->
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-medium mb-1 font-define">Bienvenue</h2>
          <p class="text-body-1 text-medium-emphasis">
            Connectez-vous à votre compte
          </p>
        </div>

        <!-- Formulaire -->
        <v-form ref="loginForm" v-model="valid" @submit.prevent="handleLogin">
          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Nom d'utilisateur"
            type="email"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            :rules="usernameRules"
            color="primary"
            class="mb-4 rounded-xl"
            rounded="xl"
            required
          />

          <!-- Mot de passe -->
          <v-text-field
            v-model="password"
            label="Mot de passe"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="outlined"
            :rules="passwordRules"
            color="primary"
            class="mb-2"
            required
            @click:append-inner="showPassword = !showPassword"
          />

          <!-- Bouton de connexion -->
          <v-btn
            type="submit"
            color="primary"
            size="x-large"
            block
            rounded="lg"
            :loading="loading"
            :disabled="!valid"
            class="mb-4 text-none rounded-xl"
          >
            <span class="text-h6 font-weight-medium">Se connecter</span>
          </v-btn>

          <!-- Se souvenir / Mot de passe oublié -->
          <div class="d-flex justify-space-between align-center">
            <p class="font-define">
              <span>Mot de passe oublié ?</span>
              <span class="pl-3"
                ><router-link
                  @click="forgotPassword"
                  to="#"
                  class="text-decoration-none text-body-2 text-medium-emphasis text-primary font-define"
                >
                  Retrouver le ici.
                </router-link>
              </span>
            </p>
          </div>

          <!-- Divider -->
          <div class="divider-container my-6">
            <v-divider />
            <span class="divider-text px-4">OU</span>
            <v-divider />
          </div>

          <!-- Connexion alternatives -->
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            size="large"
            block
            class="mb-3 text-none rounded-xl"
            prepend-icon="mdi-google"
            @click="
              notify({
                color: 'success',
                message: 'Fonctionnalité à venir !',
                visible: true,
              })
            "
          >
            Continuer avec Google
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Snackbar pour le chargement -->
    <ToastLoading v-model="toast_loading" />
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.svg";
import name from "@/assets/images/name.svg";
import ToastLoading from "@/components/ui/toast-loading.vue";
import { useSeoHead } from "@/composables/useSeoHead";
import { notify } from "@/helpers/notifications.helper";

const router = useRouter();

useSeoHead({
  title: "Se Connecter",
  subtitle: "Connectez-vous à votre tableau de bord",
  forcePrefix: true,
});

// Refs
const loginForm = ref();
const valid = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const toast_loading = ref(false);

// Règles de validation
const usernameRules = [
  (v: string) => !!v || "Le nom d'utilisateur est requis",
  (v: string) =>
    /^\S+$/.test(v) || "Le nom d'utilisateur ne doit pas contenir d'espaces",
];

const passwordRules = [
  (v: string) => !!v || "Le mot de passe est requis",
  (v: string) =>
    v.length >= 6 || "Le mot de passe doit contenir au moins 6 caractères",
];

// Méthodes
const handleLogin = async () => {
  const { valid: isValid } = await loginForm.value.validate();

  if (!isValid) return;

  loading.value = true;

  try {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Implémenter votre logique de connexion ici
    console.log("Login:", {
      email: email.value,
      password: password.value,
    });

    notify({
      color: "success",
      message: "Connexion réussie !",
      visible: true,
    });

    // Rediriger après connexion
    setTimeout(() => {
      router.push("/client/dashboard");
    }, 1000);
  } catch (error) {
    notify({
      color: "error",
      message: "Erreur de connexion. Veuillez réessayer.",
      visible: true,
    });
  } finally {
    loading.value = false;
  }
};

const forgotPassword = (e: Event) => {
  toast_loading.value = true;

  setTimeout(() => {
    toast_loading.value = false;
    notify({
      color: "error",
      message: "Nothing to see here !",
      visible: true,
    });
  }, 3000);
  console.log("Mot de passe oublié");
};
</script>

<style scoped>
/* Carte de login */
.login-card {
  animation: slideInRight 0.6s ease-out;
}

.login-card.effect {
  background: #0000 !important;
}

/*Gere le titre*/
.font-define {
  font-family: "Montserrat", sans-serif;
}

/* Divider avec texte */
.divider-container {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
}

.divider-text {
  background: #fff0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
