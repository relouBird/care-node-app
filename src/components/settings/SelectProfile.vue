<script setup lang="ts">
import user1 from "@/assets/images/profile/user-1.jpg";
import user2 from "@/assets/images/profile/user-2.jpg";
import user3 from "@/assets/images/profile/user-3.jpg";
import user4 from "@/assets/images/profile/user-4.jpg";
import user5 from "@/assets/images/profile/user-5.jpg";
import user6 from "@/assets/images/profile/user-6.jpg";
import user7 from "@/assets/images/profile/user-7.jpg";
import user8 from "@/assets/images/profile/user-8.jpg";
import user9 from "@/assets/images/profile/user-9.jpg";
import user10 from "@/assets/images/profile/user-10.jpg";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-vue";

// Profiles prédefinis
const profiles = [
  { id: 1, profil: user1 },
  { id: 2, profil: user2 },
  { id: 3, profil: user3 },
  { id: 4, profil: user4 },
  { id: 5, profil: user5 },
  { id: 6, profil: user6 },
  { id: 7, profil: user7 },
  { id: 8, profil: user8 },
  { id: 9, profil: user9 },
  { id: 10, profil: user10 },
];

// Variables réactives
const selectedAvatar = ref(1);
const tempSelectedAvatar = ref(1);
const showDialog = ref(false);

// Ouvrir le dialog
const openDialog = () => {
  tempSelectedAvatar.value = selectedAvatar.value;
  showDialog.value = true;
};

// Valider le choix
const confirmSelection = () => {
  selectedAvatar.value = tempSelectedAvatar.value;
  showDialog.value = false;

  // TODO: Sauvegarder le choix dans votre API
  console.log("Profil sélectionné:", selectedAvatar.value);
};

// Annuler
const cancelSelection = () => {
  tempSelectedAvatar.value = selectedAvatar.value;
  showDialog.value = false;
};
</script>

<template>
  <div>
    <div class="w-100 d-flex justify-center align-start">
      <div
        :class="[
          'position-relative ',
          $vuetify.display.smAndDown ? 'profileSM' : 'profile',
        ]"
      >
        <v-avatar
          :size="$vuetify.display.smAndDown ? 128 : 192"
          class="profile-avatar shadow-boxed"
        >
          <v-img
            :src="profiles[selectedAvatar - 1]?.profil || user1"
            alt="User Profile"
          />
        </v-avatar>
        <div class="position-absolute right-0 bottom-0">
          <v-btn
            icon
            size="small"
            color="primary"
            :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
            class="edit-button"
            @click="openDialog"
          >
            <IconPencil :size="18" />
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Cette partie doit etre dans un popup quand on clique sur changer de profile -->
    <v-dialog v-model="showDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <!-- Titre de la carte -->
        <v-card-title class="dialog-header">
          <div class="greeting">
            <span class="username">Profile</span>
            <span class="hello">Choisir une photo de profile</span>
          </div>
          <v-btn
            icon
            variant="flat"
            color="#7f8c8d2a"
            size="small"
            @click="cancelSelection"
          >
            <IconX color="#7f8c8d" />
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="px-6 py-3">
          <!-- Grille des avatars -->
          <div class="avatar-grid">
            <div
              v-for="avatar in profiles"
              :key="avatar.id"
              class="avatar-option"
              :class="{ selected: tempSelectedAvatar === avatar.id }"
              @click="tempSelectedAvatar = avatar.id"
            >
              <v-avatar :size="80">
                <v-img :src="avatar.profil" alt="Profil" cover />
              </v-avatar>

              <!-- Indicateur de sélection -->
              <div
                v-if="tempSelectedAvatar === avatar.id"
                class="check-overlay"
              >
                <div class="check-icon">
                  <IconCheck :size="24" stroke-width="3" />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" size="large" @click="cancelSelection">
            Annuler
          </v-btn>
          <v-btn
            color="primary"
            size="large"
            variant="flat"
            @click="confirmSelection"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
/*Profile*/
.profile {
  width: 192px;
  height: 192px;
}
.profileSM {
  width: 128px;
  height: 128px;
}

.profile-avatar {
  border: 4px solid white;
}

.greeting {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  font-family: "Montserrat", sans-serif;
}

.hello {
  margin-top: -2px;
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 400;
}

/* Dialog */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
}

/* Grille des avatars */
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  justify-items: center;
}

.avatar-option {
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 16px;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.avatar-option:hover {
  border: 1px solid #f0f0f0;
  transform: translateY(-2px);
}

.avatar-option.selected {
  border-color: #13875d;
  background: #f0fdf9;
  box-shadow: 0 4px 16px rgba(19, 135, 93, 0.2);
}

/* Overlay de sélection */
.check-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(19, 135, 93, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

.check-icon {
  width: 40px;
  height: 40px;
  background: #13875d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .avatar-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .avatar-option {
    padding: 8px;
  }

  .avatar-option .v-avatar {
    width: 70px !important;
    height: 70px !important;
  }

  .check-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
