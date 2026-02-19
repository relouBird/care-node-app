<template>
  <nav class="mobile-header">
    <div class="header-content">
      <!-- Avatar avec initiales ou logo -->
      <div class="user-section">
        <div class="avatar">
          <span class="initials">{{ userInitials }}</span>
        </div>
        <div class="greeting">
          <span class="hello">Bonjour,</span>
          <span class="username">{{ userName }}</span>
        </div>
      </div>

      <!-- Actions à droite -->
      <div class="actions">
        <!-- Bouton notifications avec badge -->
        <v-btn icon variant="text" size="small">
          <v-badge color="error" content="3" overlap offset-x="2" offset-y="3">
            <icon-bell color="#7f8c8d" />
          </v-badge>
        </v-btn>

        <!-- Bouton déconnexion -->
        <v-btn
          icon
          variant="text"
          size="small"
          color="error"
          @click="handleLogout"
        >
          <icon-logout-2 class="text-error" />
        </v-btn>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { IconBell, IconLogout2 } from "@tabler/icons-vue";
const router = useRouter();

// Nom de l'utilisateur (à récupérer depuis votre store/auth)
const userName = ref("Utilisateur");

// Calcul des initiales
const userInitials = computed(() => {
  const names = userName.value.split(" ");
  if (names.length >= 2) {
    let firstInitial: string = names[0] ? String(names[0][0]) : "";
    let secondInitial: string = names[1] ? String(names[1][0]) : "";
    return firstInitial + secondInitial;
  }
  return userName.value.slice(0, 2).toUpperCase();
});

const handleLogout = () => {
  console.log("Déconnexion en cours...");
  router.push("/auth/login");
};
</script>

<style scoped>
.mobile-header {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 500px;
  background: white;
  border-radius: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

/* Section utilisateur */
.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #13875d 0%, #1ba876 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.initials {
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}

.greeting {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hello {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 400;
}

.username {
  font-size: 15px;
  color: #2c3e50;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Responsive */
@media (max-width: 400px) {
  .mobile-header {
    width: calc(100% - 24px);
  }

  .header-content {
    padding: 10px 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .initials {
    font-size: 14px;
  }

  .hello {
    font-size: 11px;
  }

  .username {
    font-size: 14px;
  }
}
</style>
