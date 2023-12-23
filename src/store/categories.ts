import { defineStore } from "pinia";
import axios from "../utils/axios";

export interface catIFace {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface stateIFace {
  categories: catIFace[];
  isCategoryDropdownActive: boolean;
  pickedCategories: catIFace[];
}

const pickedCategoriesFromStorage = localStorage.getItem("pickedCategories")
  ? JSON.parse(localStorage.getItem("pickedCategories") || "")
  : [];

export const useCategories = defineStore("categories", {
  state: (): stateIFace => ({
    categories: [],
    isCategoryDropdownActive: false,
    pickedCategories: pickedCategoriesFromStorage,
  }),
  actions: {
    async getCategories() {
      try {
        const { data } = await axios.get("/categories");
        if (data) {
          this.categories = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleCategoryDropdown(value?: boolean) {
      if (value === false) {
        this.isCategoryDropdownActive = value;
      } else {
        this.isCategoryDropdownActive = !this.isCategoryDropdownActive;
      }
    },
    setPickedCategories(category: catIFace) {
      if (this.pickedCategories.some((pc) => pc.id === category.id)) {
        return;
      }

      this.pickedCategories.push(category);
      localStorage.setItem(
        "pickedCategories",
        JSON.stringify(this.pickedCategories)
      );
    },
    removePickedCategory(catId: number) {
      this.pickedCategories = this.pickedCategories.filter(
        (pkdCat) => pkdCat.id !== catId
      );
      localStorage.setItem(
        "pickedCategories",
        JSON.stringify(this.pickedCategories)
      );
    },
    resetPickedCategories() {
      this.pickedCategories = [];
      localStorage.removeItem("pickedCategories");
    },
  },
});
