<template>
  <div class="d-flex justify-space-between align-center mb-6">
    <h1 class="text-h4 font-weight-bold">Моя активність</h1>

    <v-btn color="primary" @click="dialog = true" icon="mdi-plus"> </v-btn>
  </div>

  <v-card class="pa-6 rounded-xl mb-6" elevation="2">
    <div class="d-flex justify-space-between align-center mb-4">
      <div>
        <div class="text-subtitle-1 text-medium-emphasis">Сьогодні</div>

        <div class="text-h4 font-weight-bold">{{ todaySteps }} кроків</div>
      </div>

      <v-icon icon="mdi-shoe-print" size="42" color="primary" />
    </div>

    <div class="d-flex justify-space-between mb-2">
      <div class="text-h3 font-weight-bold">
        {{ todaySteps.toLocaleString() }}
      </div>

      <div class="text-subtitle-1 text-medium-emphasis">кроків</div>
    </div>

    <v-progress-linear
      :model-value="progressPercent"
      :color="progressColor"
      height="10"
      rounded
    />
  </v-card>

  <v-row class="mb-6">
    <v-col cols="12" md="4">
      <v-card class="pa-4 rounded-xl">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="text-subtitle-2 text-medium-emphasis">
              Кроки за місяць
            </div>

            <div
              class="text-h5 font-weight-bold"
              v-if="!!activityStore.monthSteps"
            >
              {{ activityStore.monthSteps.toLocaleString() }}
            </div>
          </div>

          <v-icon icon="mdi-shoe-print" size="36" color="success" />
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card class="pa-4 rounded-xl">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="text-subtitle-2 text-medium-emphasis">
              Відстань за місяць
            </div>

            <div
              class="text-h5 font-weight-bold"
              v-if="!!activityStore.monthDistance"
            >
              {{ activityStore.monthDistance.toFixed(2) }} км
            </div>
          </div>

          <v-icon icon="mdi-map-marker-distance" size="36" color="info" />
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card class="pa-4 rounded-xl">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="text-subtitle-2 text-medium-emphasis">
              Калорії за місяць
            </div>

            <div
              class="text-h5 font-weight-bold"
              v-if="!!activityStore.monthCalories"
            >
              {{ activityStore.monthCalories.toLocaleString() }}
            </div>
          </div>

          <v-icon icon="mdi-fire" size="36" color="warning" />
        </div>
      </v-card>
    </v-col>
  </v-row>

  <v-card class="pa-4 rounded-xl" v-if="!$vuetify.display.mobile">
    <v-card-title> Останні записи </v-card-title>
    <v-data-table
      :headers="activityHeaders"
      :items="activityStore.allActivities"
      :items-per-page="5"
      :items-per-page-options="[5, 10, 20, 50]"
    >
      <template #[`item.date`]="{ item }">
        {{ formatDate(item.date) }}
      </template>

      <template #[`item.steps`]="{ item }">
        <v-chip color="success" variant="tonal" size="large">
          <v-icon start>mdi-shoe-print</v-icon>
          {{ item.steps.toLocaleString() }}
        </v-chip>
      </template>

      <template #[`item.distance`]="{ item }">
        <v-chip color="info" variant="tonal" size="large">
          <v-icon start>mdi-map-marker-distance</v-icon>
          {{ item.distance }} км
        </v-chip>
      </template>

      <template #[`item.calories`]="{ item }">
        <v-chip color="warning" variant="tonal" size="large">
          <v-icon start>mdi-fire</v-icon>
          {{ item.calories }} kcal
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
  <div v-else>
    <h2>Останні записи</h2>
    <v-card
      v-for="activity in activityStore.allActivities"
      :key="activity._id"
      class="pa-4 mb-3 rounded-lg"
    >
      <div class="font-weight-bold mb-2">
        {{ formatDate(activity.date) }}
      </div>

      <div class="d-flex flex-column ga-2">
        <v-chip color="success" variant="tonal">
          <v-icon start>mdi-shoe-print</v-icon>
          {{ activity.steps.toLocaleString() }} кроків
        </v-chip>

        <v-chip color="info" variant="tonal">
          <v-icon start>mdi-map-marker-distance</v-icon>
          {{ activity.distance }} км
        </v-chip>

        <v-chip color="warning" variant="tonal">
          <v-icon start>mdi-fire</v-icon>
          {{ activity.calories }} kcal
        </v-chip>
      </div>
    </v-card>
  </div>

  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4">Додати активність </v-card-title>
      <v-cart-text>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-text-field
            v-model="date"
            label="Дата"
            type="date"
            variant="outlined"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            v-model="steps"
            label="Кроки"
            type="number"
            variant="outlined"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            v-model="distance"
            label="Відстань, км"
            type="number"
            variant="outlined"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            v-model="calories"
            label="Калорії"
            type="number"
            variant="outlined"
            :rules="[required]"
          ></v-text-field>
          <div class="d-flex justify-end ga-3 mt-4">
            <v-btn variant="text" @click="dialog = false"> Скасувати </v-btn>

            <v-btn color="primary" type="submit"> Зберегти </v-btn>
          </div>
        </v-form>
      </v-cart-text>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" color="success" timeout="3000">
    User successfully created
  </v-snackbar>
  <v-snackbar v-model="errorSnackbar" color="error" timeout="3000">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/auth-store/useAuthStore";
import { useActivityStore } from "@/stores/activity-store/useActivityStore";
import { activityHeaders } from "@/constants/recent-activities-heading";

const activityStore = useActivityStore();
const authStore = useAuthStore();
const dialog = ref(false);
const date = ref("");
const steps = ref("");
const distance = ref("");
const calories = ref("");
const snackbar = ref(false);
const errorSnackbar = ref(false);
const errorMessage = ref("");
const snackbarMessage = ref("");
const formRef = ref(null);
const dailyGoal = ref(20000);

const progressColor = computed(() => {
  if (progressPercent.value >= 100) return "success";
  if (progressPercent.value >= 70) return "primary";
  if (progressPercent.value >= 40) return "warning";

  return "error";
});

const progressPercent = computed(() => {
  return Math.min(Math.round((todaySteps.value / dailyGoal.value) * 100), 100);
});

function required(v) {
  return !!v || "Field is required";
}
function formatDate(date) {
  return new Date(date)
    .toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" р.", "");
}

async function onSubmit() {
  const { valid } = await formRef.value.validate();

  if (!valid) return;

  const payload = {
    userId: authStore.user.id,
    date: date.value,
    steps: Number(steps.value),
    distance: Number(distance.value),
    calories: Number(calories.value),
  };

  try {
    await activityStore.createActivity(payload);
    snackbarMessage.value = "Активність успішно збережена";
    snackbar.value = true;
    dialog.value = false;
  } catch (error) {
    errorMessage.value = "Не вдалося зберегти активність";
    errorSnackbar.value = true;
  }
}

const todaySteps = computed(() => {
  const today = new Date().toISOString().split("T")[0];

  const activity = activityStore.allActivities.find((a) => a.date === today);

  return activity?.steps || 0;
});
onMounted(() => {
  activityStore.getActivities(authStore.user.id);
});
</script>
