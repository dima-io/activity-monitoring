const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "Activity Monitoring",

    themeColor: "#1976D2",

    msTileColor: "#1976D2",

    appleMobileWebAppCapable: "yes",

    appleMobileWebAppStatusBarStyle: "black",
  },
});
