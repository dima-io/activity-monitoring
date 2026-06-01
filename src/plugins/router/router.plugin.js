import { markRaw } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

export function routerPlugin({ store }) {
  store.router = markRaw(router);
}
