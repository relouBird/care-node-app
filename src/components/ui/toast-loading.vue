<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Chargement...",
  message: "",
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

watch(isVisible, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<template>
  <v-snackbar
    v-model="isVisible"
    location="top center"
    :timeout="-1"
    color="white"
    elevation="8"
    rounded="xl"
    class=" mt-4"
  >
    <div class="toast-content">
      <!-- Icone de chargement -->
      <div>
        <v-progress-circular
          indeterminate
          color="primary"
          size="18"
          width="2"
        ></v-progress-circular>
      </div>

      <!-- Texte -->
      <div class="">
        <p class="toast-title font-define pt-1">{{ title }}</p>
        <div v-if="message" class="toast-message">{{ message }}</div>
      </div>
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
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
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
}

.font-define {
  font-family: "Montserrat", sans-serif;
}

/* Responsive */
@media (max-width: 600px) {
  :deep(.v-snackbar__wrapper) {
    min-width: calc(100vw - 20%);
    max-width: calc(100vw - 20%);
  }
}
</style>
