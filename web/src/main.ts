import "primeicons/primeicons.css";

import App from "./App.vue";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);

app.component("Button", Button);

app.mount("#app");
