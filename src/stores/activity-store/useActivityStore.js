import { addActivity, fetchActivities } from "@/services/activity.service";
import { defineStore } from "pinia";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    loading: false,
    error: null,
    activities: [],
  }),

  actions: {
    async createActivity(payload) {
      try {
        this.loading = true;
        await addActivity(payload);
        this.activities = await fetchActivities(payload.userId);
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to save activity";

        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getActivities(userId) {
      try {
        this.loading = true;
        this.activities = await fetchActivities(userId);
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to sget activity";

        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true,

  getters: {
    allActivities: (state) => state.activities,
  },
});
