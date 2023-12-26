import { defineStore } from "pinia";
import axios from "../utils/axios";
import { getBlogIFace } from "./blogs";

interface stateIFace {
  isGetBlogLoading: boolean;
  blog: getBlogIFace;
}

export const useBlog = defineStore("blog", {
  state: (): stateIFace => ({
    isGetBlogLoading: false,
    blog: {} as getBlogIFace,
  }),
  actions: {
    async getBlog(blogId: number) {
      this.isGetBlogLoading = true;

      try {
        const { data } = await axios.get(`/blogs/${blogId}`);

        if (data) {
          this.isGetBlogLoading = false;
          this.blog = data;
        }
      } catch (error) {
        this.isGetBlogLoading = false;
        console.log(error);
      }
    },
  },
});
