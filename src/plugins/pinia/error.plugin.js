import { toRef } from "vue";

export function errorPlugin({ store }) {
  if (!store.$state) return;

  if (!Object.hasOwn(store.$state, "error")) {
    store.$state.error = null;
  }

  store.hasError = toRef(store.$state, "error");

  const originalReset = store.$reset.bind(store);

  return {
    $reset() {
      originalReset();
      store.error = null;
    },
  };
}
