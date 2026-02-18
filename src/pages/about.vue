<script lang="ts" setup></script>

<template>
  <v-container class="py-8">
    <div class="text-center">
      <v-row class="mb-8" justify="center">
        <v-col cols="12" md="8">
          <v-card color="surface-variant" rounded="lg" variant="tonal">
            <v-card-title class="text-h5 font-weight-bold">
              About Page
            </v-card-title>

            <v-card-text>
              This is the about page. You can navigate back to the home page by
              clicking the link below.
            </v-card-text>

            <v-card-actions>
              <router-link to="/">Go back to Home</router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
