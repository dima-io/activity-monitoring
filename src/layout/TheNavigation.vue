<template>
  <v-row align="center" class="mb-4">
    <v-col cols="12" class="d-flex justify-end align-center">
      <v-btn
        icon
        density="comfortable"
        elevation="1"
        @click="toggleTheme"
        class="mr-3"
      >
        <v-icon>
          {{ isDarkMode ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
        </v-icon>
      </v-btn>
      <v-btn
        variant="outlined"
        color="primary"
        class="mr-3"
        :to="'/authorization'"
        @click="logout"
      >
        Вийти
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from "@/stores/auth-store/useAuthStore";

export default {
  props: {
    isSyncLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isDarkMode: false,
      authStore: useAuthStore(),
    };
  },

  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.$vuetify.theme.global.name = this.isDarkMode ? "dark" : "light";
    },

    logout() {
      this.authStore.logout();

      this.$router.push("/authorization");
    },
  },
};
</script>
