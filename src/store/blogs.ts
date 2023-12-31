import { defineStore } from "pinia";
import axios from "../utils/axios";
import { catIFace } from "./categories";

interface blogIFace {
  title: string;
  description: string;
  image: string | ArrayBuffer | undefined;
  author: string;
  publish_date: string;
  categories: number[];
  email: string;
}

export interface getBlogIFace {
  id: number;
  title: string;
  description: string;
  image?: string;
  publish_date: string;
  categories: catIFace[];
  author: string;
  email?: string;
}

interface stateIFace {
  isSuccessModalActive: boolean;
  isPostBlogLoading: boolean;
  isPostBlogSuccess: boolean;
  isGetBlogsLoading: boolean;
  blogs: getBlogIFace[];
  categoryIdsForFilter: number[];
  filteredBlogs: getBlogIFace[];
  similarBlogs: getBlogIFace[];
}

const categoryFilterIdsFromStorage = localStorage.getItem("categoryFilterIds")
  ? JSON.parse(localStorage.getItem("categoryFilterIds") || "")
  : [];

export const useBlogs = defineStore("blogs", {
  state: (): stateIFace => ({
    isSuccessModalActive: false,
    isPostBlogLoading: false,
    isPostBlogSuccess: false,
    isGetBlogsLoading: false,
    blogs: [],
    categoryIdsForFilter: categoryFilterIdsFromStorage,
    filteredBlogs: [],
    similarBlogs: [],
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

    async getBlogs() {
      this.isGetBlogsLoading = true;

      try {
        const { data } = await axios.get("/blogs");

        if (data) {
          this.isGetBlogsLoading = false;

          const newData = data.data.filter(
            (blog: blogIFace) => new Date(blog.publish_date) <= new Date()
          );

          this.blogs = newData;
        }
      } catch (error) {
        this.isGetBlogsLoading = false;
        console.log(error);
      }
    },

    filterBlogs(idsForFilter: number[]) {
      return this.blogs.filter((blog) => {
        return blog.categories.some((cat) => idsForFilter.includes(cat.id));
      });
    },

    setCategoryIdsForFilter(catId: number) {
      if (this.categoryIdsForFilter.some((id) => id === catId)) {
        this.categoryIdsForFilter = this.categoryIdsForFilter.filter(
          (id) => id !== catId
        );
        this.filteredBlogs = this.filterBlogs(this.categoryIdsForFilter);
        localStorage.setItem(
          "categoryFilterIds",
          JSON.stringify(this.categoryIdsForFilter)
        );
        return;
      }

      this.categoryIdsForFilter.push(catId);
      this.filteredBlogs = this.filterBlogs(this.categoryIdsForFilter);
      localStorage.setItem(
        "categoryFilterIds",
        JSON.stringify(this.categoryIdsForFilter)
      );
    },

    setCategoryIdsForFilterWithUrlVal(catIds: number[]) {
      this.categoryIdsForFilter = catIds;
      this.filteredBlogs = this.filterBlogs(this.categoryIdsForFilter);
    },

    removeFilter() {
      this.categoryIdsForFilter = [];
      localStorage.removeItem("categoryFilterIds");
    },

    getSimilarBlogs(blogId: number, categories: catIFace[]) {
      const catIds = categories.map((cat) => cat.id);
      const filteredBlogs = this.filterBlogs(catIds).filter(
        (blog) => blog.id !== blogId
      );
      this.similarBlogs = filteredBlogs;
    },

    resetPostBlog() {
      this.isPostBlogSuccess = false;
    },
  },
});
