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
        this.error = error.response?.data?.message || "Failed to get activity";

        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true,

  getters: {
    allActivities: (state) => state.activities,
    monthlyActivities: (state) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      return state.activities.filter((activity) => {
        const activityDate = new Date(activity.date);
        return (
          activityDate.getMonth() === currentMonth &&
          activityDate.getFullYear() === currentYear
        );
      });
    },

    monthSteps() {
      const activities = this.monthlyActivities;
      return activities.reduce((total, activity) => total + activity.steps, 0);
    },
    monthDistance() {
      const activities = this.monthlyActivities;
      return activities.reduce(
        (total, activity) => total + activity.distance,
        0,
      );
    },
    monthCalories() {
      const activities = this.monthlyActivities;
      return activities.reduce(
        (total, activity) => total + activity.calories,
        0,
      );
    },
  },
});
