<script lang="ts" setup>
 import logo from '@/assets/images/logo.svg'
 import name from '@/assets/images/name.svg'
</script>

<template>
  <v-responsive>
    <v-app class="bloc">
      <v-row justify="center" class="pa-0" align="center">
        <main>
          <div class="d-flex flex-column align-center ga-8 mb-10">
            <img :src="logo" class="imagePage" width="130" alt="" />
            <img :src="name" class="imagePage" width="250" alt="" />
          </div>
          <router-view />
        </main>
      </v-row>
    </v-app>
  </v-responsive>
</template>
