import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("matcars", () => {
  const isLoggedIn = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);

  return { isLoggedIn, isAdmin };
});
