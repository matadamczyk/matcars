/* eslint-disable */
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import About from "@/components/routes/About.vue";
import AdminPanel from "@/components/routes/AdminPanel.vue";
import Contact from "@/components/routes/Contact.vue";
import Home from "@/components/routes/Home.vue";
import Offer from "@/components/routes/Offer.vue";
import UserPanel from "@/components/routes/UserPanel.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/offer", name: "Offer", component: Offer },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/admin", name: "AdminPanel", component: AdminPanel },
    { path: "/user", name: "UserPanel", component: UserPanel },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
