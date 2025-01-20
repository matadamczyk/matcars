import { onMounted, ref } from "vue";

import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  rola: string;
  exp: number;
}

export const useStore = defineStore("matcars", () => {
  const isLoggedIn = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);
  const token = ref<string | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("authToken", newToken);
    isLoggedIn.value = true;
    const decoded: DecodedToken = jwtDecode(newToken);
    isAdmin.value = decoded.rola === "admin";
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem("authToken");
    isLoggedIn.value = false;
    isAdmin.value = false;
  };

  onMounted(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      token.value = savedToken;
      isLoggedIn.value = true;
      const decoded: DecodedToken = jwtDecode(savedToken);
      isAdmin.value = decoded.rola === "admin";
    }
  });

  return { isLoggedIn, isAdmin, token, setToken, clearToken };
});
