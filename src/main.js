/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App);

registerPlugins(app);

app.mount("#app");
app.use(Toast);
