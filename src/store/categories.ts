import { defineStore } from "pinia";
import axios from "../utils/axios";

interface catIFace {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface stateIFace {
  categories: catIFace[];
}

export const useCategories = defineStore("categories", {
  state: (): stateIFace => ({
    categories: [],
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
  },
});
