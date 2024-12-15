/* eslint-disable */
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import About from "@/components/routes/About.vue";
import Contact from "@/components/routes/Contact.vue";
import Home from "@/components/routes/Home.vue";
import Offer from "@/components/routes/Offer.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/offer", name: "Offer", component: Offer },
    { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
