<template>
  <v-container class="notification-page">
    <h1 class="text-h4 font-weight-bold">Notification</h1>
    <v-card>
      <v-card-title>Quick Actions</v-card-title>

      <v-card-text class="d-flex flex-column flex-sm-row ga-3">
        <v-btn
          color="primary"
          prepend-icon="mdi-bell-ring"
          :loading="reminderLoading"
          @click="handleReminder"
        >
          Send Reminder
        </v-btn>

        <v-btn
          color="success"
          prepend-icon="mdi-trophy"
          :loading="leaderboardLoading"
          @click="handleLeaderboard"
        >
          Send Leaderboard
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { sendLeaderboard, sendReminder } from "@/services/notification.service";
import { ref } from "vue";

const reminderLoading = ref(false);
const leaderboardReminder = ref(false);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function handleReminder() {
  try {
    reminderLoading.value = true;
    await Promise.all([sendReminder(), delay(700)]);
  } finally {
    reminderLoading.value = false;
  }
}

async function handleLeaderboard() {
  try {
    leaderboardReminder.value = true;
    await Promise.all([sendLeaderboard(), delay(700)]);
  } finally {
    leaderboardReminder.value = false;
  }
}
</script>
