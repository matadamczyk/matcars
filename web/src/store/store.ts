import { onMounted, ref } from "vue";

import { Customer } from "@/interfaces/Customer.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  rola: string;
  exp: number;
  imie: string;
  nazwisko: string;
  email: string;
}

axios.defaults.baseURL = 'http://localhost:3050/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useStore = defineStore("matcars", () => {
  const isLoggedIn = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);
  const token = ref<string | null>(null);
  const clientDetails = ref<Customer | null>(null);
  const user = ref<{ id: number; imie: string; nazwisko: string; email: string } | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("authToken", newToken);
    isLoggedIn.value = true;
    const decoded: DecodedToken = jwtDecode(newToken);
    isAdmin.value = decoded.rola === "admin";
    user.value = { id: decoded.id, imie: decoded.imie, nazwisko: decoded.nazwisko, email: decoded.email };
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem("authToken");
    isLoggedIn.value = false;
    isAdmin.value = false;
    user.value = null;
  };

  const getToken = () => {
    return token.value;
  };

  const getUserDetails = () => {
    return user.value;
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/uzytkownicy/me", {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json"
        },
      });
      user.value = response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const setClientDetails = (details: Customer) => {
    const userDetails = getUserDetails();
    if (userDetails) {
      details.imie = userDetails.imie;
      details.nazwisko = userDetails.nazwisko;
      details.email = userDetails.email;
    }
    clientDetails.value = details;
  };

  const getClientDetails = (): Customer | null => {
    return clientDetails.value;
  };

  const clearClientDetails = () => {
    clientDetails.value = null;
  };

  onMounted(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      token.value = savedToken;
      isLoggedIn.value = true;
      const decoded: DecodedToken = jwtDecode(savedToken);
      isAdmin.value = decoded.rola === "admin";
      user.value = { id: decoded.id, imie: decoded.imie, nazwisko: decoded.nazwisko, email: decoded.email };
      fetchUserData();
    }
  });

  return { 
    isLoggedIn, 
    isAdmin, 
    token, 
    user, 
    setToken, 
    clearToken, 
    setClientDetails, 
    getClientDetails, 
    clearClientDetails,
    getUserDetails,
    fetchUserData,
    getToken 
  };
});
