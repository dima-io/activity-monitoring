import { deleteUser, getUsers } from "@/services/auth.service";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  getters: {
    allUsers: (state) => state.users,

    activeUsers: (state) =>
      state.users.filter((user) => user.status === "Active"),

    usersCount: (state) => state.users.length,
  },
  actions: {
    async getUsers() {
      this.loading = true;
      this.error = null;

      try {
        this.users = await getUsers();
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to load users";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async removeUser(id) {
      this.loading = true;
      this.error = null;

      try {
        await deleteUser(id);
        this.users = await getUsers();
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to delete user";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true,
});
