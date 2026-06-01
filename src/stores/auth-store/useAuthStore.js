import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    setAuth(data) {
      this.token = data.token;
      this.user = data.user;
    },

    logout() {
      this.token = null;
      this.user = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,

    userRole: (state) => state.user?.role,
  },

  persist: true,
});
