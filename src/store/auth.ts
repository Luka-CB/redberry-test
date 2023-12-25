import { defineStore } from "pinia";
import axios from "../utils/axios";

const isAuthFromStorage = localStorage.getItem("isAuth")
  ? JSON.parse(localStorage.getItem("isAuth") || "")
  : false;

export const useAuth = defineStore("auth", {
  state: () => ({
    isAuthModalActive: false,
    isLoginLoading: false,
    isLoginSuccess: false,
    isError: false,
    isAuth: isAuthFromStorage,
  }),
  actions: {
    toggleAuthModal(value: boolean) {
      this.isAuthModalActive = value;
    },
    async login(email: string) {
      this.isLoginLoading = true;
      this.isError = false;

      try {
        const { status } = await axios.post("/login", { email });

        if (status === 204) {
          this.isLoginLoading = false;
          this.isLoginSuccess = true;
        }
      } catch (error) {
        this.isLoginLoading = false;
        this.isError = true;
        console.log(error);
      }
    },

    acceptAuth() {
      this.isAuth = true;
      this.isLoginSuccess = false;
      this.isAuthModalActive = false;
      localStorage.setItem("isAuth", JSON.stringify(this.isAuth));
    },

    logout() {
      this.isAuth = false;
      localStorage.removeItem("isAuth");
      localStorage.removeItem("values");
      localStorage.removeItem("imageFile");
      localStorage.removeItem("pickedCategories");
    },
  },
});
