<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4">
        <h1 class="mb-6">Додати нового користувача</h1>
        <v-form ref="formRef" v-model="isFormValid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="name"
            :counter="30"
            label="Ім'я"
            color="primary"
            variant="underlined"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :counter="30"
            label="Почта"
            color="primary"
            variant="underlined"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="10"
            label="Пароль"
            color="primary"
            variant="underlined"
            :rules="passwordRules"
          ></v-text-field>
          <v-radio-group
            v-model="role"
            inline
            color="primary"
            :roles="roleRules"
          >
            <v-radio label="User" value="user" class="primary" />
            <v-radio label="Admin" value="admin" class="primary" />
          </v-radio-group>
          <v-btn type="submit" variant="outlined" color="primary"
            >Додати користувача</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar" color="success" timeout="3000">
    Користувач усспішно доданий
  </v-snackbar>
  <v-snackbar v-model="errorSnackbar" color="error" timeout="3000">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup>
import { registerUser } from "@/services/auth.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isFormValid = ref(false);
const formRef = ref(null);
const snackbar = ref(false);
const errorSnackbar = ref(false);
const errorMessage = ref("");

const name = ref("");
const email = ref("");
const password = ref("");

const role = ref("user");

const nameRules = [
  (v) => !!v || "Поле ім'я обо'язкове",
  (v) => v.length >= 3 || "Поле ім'я має містити мінімум 3 символи",
];
const emailRules = [
  (v) => !!v || "Поле почта обо'язкове",
  (v) => /.+@.+\..+/.test(v) || "Почта має бути обовязк",
];

const passwordRules = [
  (v) => !!v || "Поле пароль обо'язкове ",
  (v) => v.length >= 6 || "Поле пароль має містити мінімум 6 символів",
];

const roleRules = [(v) => !!v || "Поле роль обо'язкове"];

async function onSubmit() {
  try {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    await registerUser(payload);
    snackbar.value = true;
    setTimeout(() => {
      router.push("/admin/users");
    }, 1500);
  } catch (e) {
    console.log("Error", e);
    errorMessage.value = e.response?.data?.message || "Щось пішло не так";
    errorSnackbar.value = true;
  }
  const { valid } = await formRef.value.validate();
  if (!valid) return;
}
</script>
