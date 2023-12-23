import { defineStore } from "pinia";
import axios from "../utils/axios";

interface blogIFace {
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: number[];
  email: string;
}

const token =
  "ce8cdaf18bf0ca4a945dba410b3ceac0128df681563c04446f0915537ee7fcab";

export const useBlogs = defineStore("blogs", {
  state: () => ({
    isSuccessModalActive: false,
    isPostBlogLoading: false,
    isPostBlogSuccess: false,
  }),
  actions: {
    toggleSuccessModal(value: boolean) {
      this.isSuccessModalActive = value;
    },
    async postBlog(blog: blogIFace) {
      this.isPostBlogLoading = true;

      try {
        const { status } = await axios.post("/blogs", blog, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 204) {
          this.isPostBlogLoading = false;
          this.isPostBlogSuccess = true;
        }
      } catch (error) {
        this.isPostBlogLoading = false;
        console.log(error);
      }
    },

    resetPostBlog() {
      this.isPostBlogSuccess = false;
    },
  },
});
