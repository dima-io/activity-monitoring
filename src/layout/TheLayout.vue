<template>
  <v-layout>
    <v-app-bar v-if="$vuetify.display.mobile" color="indigo" flat>
      <v-btn icon="mdi-menu" @click="drawerOpen = !drawerOpen" />
      <v-app-bar-title>Activity</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      color="indigo"
      v-model="drawerOpen"
      :rail="isRail"
      :temporary="$vuetify.display.mobile"
      :permanent="!$vuetify.display.mobile"
    >
      <v-list>
        <v-list-item
          :prepend-avatar="authStore.user?.avatar || ''"
          :title="authStore.user?.name || ''"
          @click="isRail && toggle()"
        >
          <template v-slot:append>
            <v-btn
              :inert="isRail"
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="toggle"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <template v-for="route in menuItems" :key="route.key">
          <v-list-item
            v-if="!route.children"
            :prepend-icon="route.meta.icon"
            :title="route.meta.title"
            :to="`/${route.path}`"
          ></v-list-item>
          <v-list-group v-else>
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="route.meta.icon"
                :title="route.meta.title"
              />
            </template>
            <v-list-item
              v-for="child in route.children"
              :key="child.path"
              :prepend-icon="child.meta.icon"
              :to="`/${route.path}/${child.path}`"
              :title="child.meta.title"
              class="pl-3"
              slim
            >
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <the-navigation></the-navigation>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import { useAuthStore } from "@/stores/auth-store/useAuthStore.js";
import TheNavigation from "./TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },

  data() {
    return {
      rail: false,
      mobileRail: true,
      drawerOpen: false,
      isSyncLoading: false,
      userName: "",
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
    isRail() {
      return this.$vuetify.display.mobile ? this.mobileRail : this.rail;
    },

    menuItems() {
      const layoutRoute = this.$router.options.routes.find(
        (router) => router.name === "layout",
      );

      const authStore = useAuthStore();

      const userRole = authStore.user?.role;

      return (
        layoutRoute.children?.filter((route) => {
          if (!route.meta?.showInMenu) return false;
          if (!route.meta?.roles) return true;

          return route.meta.roles.includes(userRole);
        }) || []
      );
    },
  },

  methods: {
    toggle() {
      if (this.$vuetify.display.mobile) {
        this.mobileRail = !this.mobileRail;
      } else {
        this.rail = !this.rail;
      }
    },
  },

  created() {
    this.drawerOpen = !this.$vuetify.display.mobile;
  },
};
</script>
