import "primeicons/primeicons.css";

import App from "./App.vue";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "./translation";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(i18n);
app.component("Button", Button);

app.mount("#app");
