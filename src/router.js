import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "./pages/DashboardView.vue";
import AuthorizationView from "./pages/AuthorizationView.vue";
import TheLayout from "./layout/TheLayout.vue";
import AddUserView from "./pages/AddUserView.vue";
import UsersView from "./pages/UsersView.vue";
import { useAuthStore } from "./stores/auth-store/useAuthStore.js";
import TheNotificationView from "./pages/TheNotificationView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/authorization",
      component: AuthorizationView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/",

      name: "layout",
      component: TheLayout,
      redirect: () => {
        const authStore = useAuthStore();
        return authStore.token ? "/dashboard" : "/authorization";
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
          meta: {
            title: "Мій кабінет",
            icon: "mdi-home",
            showInMenu: true,
            requiresAuth: true,
            roles: ["admin", "user"],
          },
        },
        {
          path: "admin",
          meta: {
            title: "Адміністратор",
            icon: "mdi-shield-account",
            showInMenu: true,
            requiresAuth: true,
            roles: ["admin"],
          },
          children: [
            {
              path: "users",
              component: UsersView,

              meta: {
                title: "Користувачі",
                icon: "mdi-account-group",
                showInMenu: true,
                requiresAuth: true,
                roles: ["admin"],
              },
            },

            {
              path: "add-user",
              component: AddUserView,
              meta: {
                title: "Додати користувача",
                icon: "mdi-account-plus",
                showInMenu: true,
                requiresAuth: true,
                roles: ["admin"],
              },
            },
            {
              path: "notification",
              component: TheNotificationView,

              meta: {
                title: "Сповіщення",
                icon: "mdi-bell",
                showInMenu: true,
                requiresAuth: true,
                roles: ["admin"],
              },
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      meta: {
        fallback: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;
  const role = authStore.user?.role;

  if (to.meta.fallback) {
    return isAuthenticated ? "/dashboard" : "/authorization";
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return "/authorization";
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return "/dashboard";
  }
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return "/dashboard";
  }
});
