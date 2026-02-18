<template>
  <div class="w-100 d-flex justify-center align-center">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<route lang="yaml">
meta:
  layout: loading
</route>

<script lang="ts" setup>
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.replace("/auth/login");
  }, 2000);
});
</script>
