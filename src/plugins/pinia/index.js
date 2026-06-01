import { createPinia } from "pinia";

// import { routerPlugin } from "../router/router.plugin";
// import { errorPlugin } from "./error.plugin";
// import { secretPlugin } from "./secret.plugin";
// import { devtoolsPlugin } from "./devtools.plugin";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export function setupPinia() {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  // pinia.use(routerPlugin);
  // pinia.use(errorPlugin);
  // pinia.use(secretPlugin);
  // pinia.use(devtoolsPlugin);

  return pinia;
}
