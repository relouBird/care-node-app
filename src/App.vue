<script lang="ts" setup>
import { useNotificationStore } from "@/stores/notification.store";

const useNotification = useNotificationStore();
const store = storeToRefs(useNotification);

function handleClose() {
  useNotification.close();
  console.log("____verification____");
}

watch(store.visible, (newVal) => {
  console.log("new-notification =>", store.message.value);
  setTimeout(() => {
    if (store.isVisible.value) {
      useNotification.close();
    }
  }, store.timeout.value);
});
</script>

<template>
  <v-app>
    <router-view />
  </v-app>

  <div class="bottom">
    <!-- <v-alert
      v-model="store.visible.value"
      :close-label="store.color.value"
      :color="store.color.value"
      class="animate-notif"
      theme="dark"
      border
      closable
      @click:close="handleClose"
    >
      {{ store.color.value == "error" ? "Error :" : "" }}
      {{ store.message.value }}
    </v-alert> -->

    <ToastNotifications
      v-model="store.visible.value"
      :title="store.message.value ?? ''"
      :icon="'mdi-check-circle'"
      :error="store.color.value == 'error'"
      class="animate-notif"
      v-bind:close="handleClose"
    />
  </div>
</template>

<style scoped>
.bottom {
  position: absolute !important;
  bottom: 5em;
  right: 2em;
  z-index: 1000;
}
.animate-notif {
  animation: come 400ms linear;
}

@keyframes come {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
