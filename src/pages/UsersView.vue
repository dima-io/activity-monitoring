<template>
  <h1>Users</h1>
  <v-data-table
    v-if="!$vuetify.display.mobile"
    class="elevation-1 rounded-lg"
    :headers="headings"
    :items="usersStore.allUsers"
    :items-per-page="-1"
    :loading="usersStore.loading"
    hide-default-footer
  >
    <template #[`item.status`]="{ item }">
      <v-chip
        variant="outlined"
        size="small"
        :color="item.status === 'Active' ? 'success' : 'error'"
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template #[`item.remove`]="{ item }">
      <v-chip
        variant="outlined"
        size="small"
        color="error"
        @click="onDelete(item)"
      >
        Delete
      </v-chip>
    </template>
  </v-data-table>
  <div v-else>
    <v-card
      v-for="user in usersStore.allUsers"
      :key="user._id"
      class="pa-4 mb-3 rounded-lg"
    >
      <div class="text-h6 font-weight-bold">
        {{ user.name }}
      </div>

      <div class="text-body-2 text-medium-emphasis mb-2">
        {{ user.email }}
      </div>
      <div class="d-flex justify-space-between align-center">
        <v-chip
          :color="user.role === 'admin' ? 'primary' : 'success'"
          variant="tonal"
          size="small"
        >
          {{ user.role }}
        </v-chip>
        <v-btn
          icon="mdi-delete"
          color="error"
          variant="text"
          @click="onDelete(item)"
        />
      </div>
    </v-card>
  </div>
  <v-snackbar v-model="snackbar" color="success" timeout="3000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script setup>
import { headers } from "@/constants/admin-user-heading";
import { useUsersStore } from "@/stores/users-store/useUsersStore";

import { onMounted, ref } from "vue";

const headings = ref("");
const snackbar = ref(false);
const snackbarMessage = ref("");
const usersStore = useUsersStore();
headings.value = headers;

onMounted(async () => {
  usersStore.getUsers();
});

async function onDelete(user) {
  await usersStore.removeUser(user._id);
  snackbarMessage.value = "Користувач успішно видалений";
  snackbar.value = true;
}
</script>
