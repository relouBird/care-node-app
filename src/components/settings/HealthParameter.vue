<script setup lang="ts">
// Groupes sanguins
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Profil médical
const medicalProfile = ref({
  age: 65,
  weight: 75,
  height: 170,
  bloodType: "A+",
});
</script>

<template>
  <!-- ❤️ PARAMÈTRES MÉDICAUX -->
  <v-card rounded="xl" elevation="0" class="settings-card shadow-boxed mb-4">
    <v-card-title class="section-header">
      <div class="d-flex align-center gap-2">
        <v-icon icon="mdi-heart-pulse" color="error" size="24" />
        <span>Paramètres Médicaux</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-6">
      <v-row>
        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="medicalProfile.age"
            label="Âge"
            type="number"
            variant="outlined"
            suffix="ans"
          />
        </v-col>
        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="medicalProfile.weight"
            label="Poids"
            type="number"
            variant="outlined"
            suffix="kg"
          />
        </v-col>

        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="medicalProfile.height"
            label="Taille"
            type="number"
            variant="outlined"
            suffix="cm"
          />
        </v-col>
        <v-col cols="6" class="pb-0">
          <v-select
            v-model="medicalProfile.bloodType"
            label="Groupe sanguin"
            :items="bloodTypes"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
