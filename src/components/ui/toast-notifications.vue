<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  icon?: string;
  message?: string;
  error?: boolean;
  close ?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Chargement...",
  message: "",
  icon: "mdi-loading",
  error: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const isVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  },
);

watch(
  () => isVisible.value,
  (newVal) => {
    emit("update:modelValue", newVal);
    if (newVal === true) {
      // Reset après 5 secondes
      setTimeout(() => {
        isVisible.value = false;
        emit("update:modelValue", false);
      }, 5000);
    }
    if(newVal === false && props.close) {
      props.close();
    }
  },
);
</script>

<template>
  <v-snackbar
    v-model="isVisible"
    location="top center"
    :timeout="-1"
    color="white"
    elevation="8"
    rounded="xl"
    class="mt-4"
  >
    <div class="toast-content">
      <!-- Icône loading ou error -->
      <div
        class="toast-icon"
        :class="{ 'toast-icon--error': error, 'toast-icon--success': !error }"
      >
        <v-icon
          v-if="error"
          icon="mdi-close-circle"
          color="#e74c3c"
          size="24"
        />
        <v-icon
          v-else
          :icon="icon"
          color="#13875d"
          size="24"
          :class="{ spinning: icon === 'mdi-loading' }"
        />
      </div>

      <!-- Texte -->
      <div class="toast-text pt-1">
        <div class="toast-title font-define">{{ title }}</div>
        <div v-if="message" class="toast-message font-define">
          {{ message }}
        </div>
      </div>

      <!-- Bouton fermer -->
      <v-btn
        icon="mdi-close"
        size="small"
        variant="text"
        class="toast-close"
        @click="isVisible = false"
      />
    </div>

    <!-- Progress bar (uniquement en mode loading) -->
    <div v-if="!error && icon === 'mdi-loading'" class="toast-progress">
      <v-progress-linear indeterminate color="#13875d" height="3" />
    </div>
  </v-snackbar>
</template>

<style scoped>
/* Override snackbar */
:deep(.v-snackbar__wrapper) {
  min-width: 300px;
  max-width: 450px;
  background: white !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
  border-radius: 16px !important;
}

:deep(.v-snackbar__content) {
  padding: 0 !important;
}

/* Contenu */
.toast-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
}

/* Icône */
.toast-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Mode success/loading (vert) */
.toast-icon--success {
  background: linear-gradient(135deg, #d5f5ea 0%, #a8e6d1 100%);
}

/* Mode error (rouge) */
.toast-icon--error {
  background: linear-gradient(135deg, #fadbd8 0%, #f5b7b1 100%);
}

/* Animation spinning pour loading */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Texte */
.toast-text {
  flex: 1;
}

.toast-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.5;
}

.font-define {
  font-family: "Montserrat", sans-serif;
}

/* Bouton fermer */
.toast-close {
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.2s;
  color: #7f8c8d;
}

.toast-close:hover {
  opacity: 1;
}

/* Progress bar */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 600px) {
  :deep(.v-snackbar__wrapper) {
    min-width: calc(100vw - 15%);
    max-width: calc(100vw - 15%);
  }

  .toast-content {
    gap: 12px;
    padding: 14px 16px;
  }

  .toast-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
