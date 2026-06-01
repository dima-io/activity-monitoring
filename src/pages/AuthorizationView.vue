<template>
  <v-main>
    <v-container fluid class="fill-height login-background">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="10" md="6" lg="4">
          <v-card class="pa-8" max-width="520" elevation="8">
            <v-card-title class="text-h5 mb-8 text-center text-wrap">
              Вас вітає Activity monitoring
            </v-card-title>

            <v-form v-model="form" @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-4"
                label="Лoгін"
                clearable
                variant="outlined"
              />

              <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                class="mb-8"
                label="Пароль"
                placeholder="Додайте свій пароль"
                clearable
                variant="outlined"
                type="password"
              />

              <v-btn
                :loading="loading"
                color="success"
                size="large"
                type="submit"
                variant="elevated"
                block
                height="48"
              >
                Увійти в свій кабінет
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="errorSnackbar" color="error" timeout="3000">
        {{ errorMessage }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script setup>
import { loginUser } from "@/services/auth.service";
import { useRouter } from "vue-router";

import { ref } from "vue";
import { useAuthStore } from "@/stores/auth-store/useAuthStore";
const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const errorSnackbar = ref(false);
const router = useRouter();
const authStore = useAuthStore();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function onSubmit() {
  try {
    loading.value = true;
    await delay(1000);
    const data = await loginUser({
      email: email.value,
      password: password.value,
    });

    authStore.setAuth(data);

    email.value = "";
    password.value = "";

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Ви щось ввели не то";
    errorSnackbar.value = true;
    email.value = "";
    password.value = "";
  } finally {
    loading.value = false;
  }
}

function required(v) {
  return !!v || "Поле обов'язкове";
}
</script>

<style scoped>
.login-background {
  background-image: url("@/assets/images/man-woman-running-track-side-view.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
